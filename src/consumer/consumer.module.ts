import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProtobufModule } from 'src/protobuf/protobuf.module';
import { RedisModule } from 'src/redis/redis.module';
import { ConsumerService } from './consumer.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: configService.get('REDIS_TTL'),
      }),
    }),
    RedisModule,
    ProtobufModule
  ],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class ConsumerModule { }
