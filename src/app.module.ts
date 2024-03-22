import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RedisCommonModule } from 'src/redis/redis.module';

@Module({
  imports: [UserModule, RedisCommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
