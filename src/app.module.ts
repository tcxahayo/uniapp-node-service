import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RedisCommonModule } from 'src/redis/redis.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ErrorsInterceptor } from './interceptor/errorsInterceptor';
import { AllExceptionsFilter } from './interceptor/allExceptionsFilter';
import { AuthGuard } from './utils/authGuard';
import { ClsGuard, ClsModule } from 'nestjs-cls';

@Module({
    imports: [
        /** cls 模块生成 */
        ClsModule.forRoot({
            global: true,
            guard: { generateId: true, mount: true },
        }),
        UserModule,
        RedisCommonModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ClsGuard,
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        AppService,
    ],
})
export class AppModule { }
