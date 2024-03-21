import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../db/database.module';
import { userProviders } from '../../entity/user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
})
export class UserModule {}
