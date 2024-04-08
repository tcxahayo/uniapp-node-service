import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RedisCommonService } from 'src/redis/redis.service';
import { Public } from 'src/utils/publicAuth';
import { JWT } from 'src/utils/jwtAuth';
import { isEmpty } from 'src/utils/tools';
import { ClsService } from 'nestjs-cls';
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly redisCommonService: RedisCommonService,
        private readonly cls: ClsService,
    ) {}

    /**
     * 初始化用户信息
     */
    @Public()
    @Post('initUserInfo')
    async initUserInfo(@Body() param): Promise<any> {
        const { code } = param;
        if (isEmpty(code)) {
            throw new HttpException('必传参数不能为空', 404);
        }
        const res = await this.userService.getUserOpenid(code);
        const objRes = JSON.parse(res);
        if (!isEmpty(objRes.errcode)) {
            throw new HttpException(objRes.errmsg, 404);
        }
        // 先保存用户信息，在生成token
        const userInfo = await this.userService.getUserInfo(objRes.openid);
        if (isEmpty(userInfo)) {
            // 用户第一次登录，初始化信息
            await this.userService.initUserInfo(objRes.openid);
        }
        return this.userService.createToken(objRes.openid);
    }

    /**
     * 获取用户信息
     */
    @Post('getUserInfo')
    getUserInfo() {
        const openUid = this.cls.get('openUid');
        return this.userService.getUserInfo(openUid);
    }

    /**
     * 更新用户信息
     */
    @Post('updateUserInfo')
    async updateUserInfo(
        @Body() param: { nick: string; avatar: string },
    ): Promise<string> {
        const { nick, avatar } = param;
        if (isEmpty(nick) || isEmpty(avatar)) {
            throw new HttpException('缺少必要参数', 404);
        }
        const openUid = this.cls.get('openUid');
        await this.userService.updateUserInfo({ nick, avatar, openUid });
        return '更新成功';
    }
}
