import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transformInterceptor';
import { ClsMiddleware } from 'nestjs-cls';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.use(new ClsMiddleware({ useEnterWith: false }).use);
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.listen(3000);
}
bootstrap();
