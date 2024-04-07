import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisCommonService {
    constructor(@InjectRedis() private readonly redis: Redis) {}
    /**
     * @param key
     */
    getKey(key) {
        const data = this.redis.get(key);
        return data;
    }
    getHashItem = (mapKey, key) => {
        return this.redis.hget(mapKey, key);
    };
}
