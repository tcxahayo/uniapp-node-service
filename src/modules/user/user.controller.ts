import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RedisCommonService } from 'src/redis/redis.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisCommonService: RedisCommonService,
  ) { }

  @Get('getAllUser')
  getAllUser(): any {
    return this.userService.findAll();
  }

  @Post('getRedis')
  getRedis(@Body() param): any {
    if (!param.key) {
      return 'fail';
    }
    return this.redisCommonService.getKey(param.key);
  }
}
