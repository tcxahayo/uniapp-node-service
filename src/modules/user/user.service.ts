import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { createJwtToken } from 'src/utils/jwtAuth';
import { RedisCommonService } from 'src/redis/redis.service';
import { isEmpty, getUrl } from 'src/utils/tools';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        private readonly redisCommonService: RedisCommonService,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    /**
     * 获取用户openid
     */
    getUserOpenid = async (code): Promise<string> => {
        const appId = await this.redisCommonService.getHashItem(
            'huajiao',
            'app_id',
        );
        const appSecret = await this.redisCommonService.getHashItem(
            'huajiao',
            'app_secret',
        );
        if (isEmpty(appId) || isEmpty(appSecret)) {
            throw new HttpException('获取小程序信息失败', 404);
        }
        const res = await getUrl(
            `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`,
        );
        return res;
    };
    /**
     * 获取用户信息
     */
    getUserInfo = (openUid: string) => {
        return this.userRepository.findOne({ where: { openUid } });
    };
    /**
     * 初始化用户信息
     */
    initUserInfo = (openUid: string) => {
        return this.userRepository.insert({ openUid });
    };
    /**
     * 创建token
     */
    createToken(code: string) {
        return createJwtToken({ code });
    }
    /**
     * 更新用户信息
     */
    updateUserInfo = ({
        nick,
        avatar,
        openUid,
    }: {
        nick: string;
        avatar: string;
        openUid: string;
    }) => {
        return this.userRepository.update({ openUid }, { nick, avatar });
    };
}
