import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        RedisModule.forRootAsync({
            useFactory: () => ({
                config: {
                    host: '101.35.223.219',
                    port: 6379,
                    password: 'Pass@word12!',
                    db: 0,
                }
            })
        }),
    ],
})
export class RedisCommonModule {}
