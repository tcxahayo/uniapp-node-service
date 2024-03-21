import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { RedisConfigService } from './redis.service';

const options = {
  port: 6379,
  host: '101.35.223.219',
  password: 'Pass@word12!',
  decode_responses: true,
  db: 0,
};
@Module({
  imports: [RedisModule.register(options)],

  providers: [RedisConfigService],
  exports: [RedisConfigService],
})
export class CacheModule {}
