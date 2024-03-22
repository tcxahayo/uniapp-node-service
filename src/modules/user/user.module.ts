import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { userProviders } from 'src/entity/user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RedisCommonService } from 'src/redis/redis.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService, RedisCommonService],
  controllers: [UserController],
})
export class UserModule {}
