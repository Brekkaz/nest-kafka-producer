import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProducerModule } from './producer/producer.module';
import { ProtobufModule } from './protobuf/protobuf.module';
import { DataManagerModule } from './data-manager/data-manager.module';

import Configuration from './config/configuration';
import { ConsumerModule } from './consumer/consumer.module';
import { AppController } from './app.controller';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      expandVariables: true,
    }),
    ProducerModule,
    ProtobufModule,
    DataManagerModule,
    ConsumerModule,
    RedisModule,
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
