import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProducerModule } from './producer/producer.module';
import { ProtobufModule } from './protobuf/protobuf.module';
import { DataManagerModule } from './data-manager/data-manager.module';

import Configuration from './config/configuration';
import { DataManagerService } from './data-manager/data-manager.service';
import { ProtobufService } from './protobuf/protobuf.service';
import { ProduccerService } from './producer/produccer.service';
import { ConsumerModule } from './consumer/consumer.module';
import { EventsService } from './events/events.service';
import { AppController } from './app.controller';

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
  ],
  controllers: [AppController],
  providers: [
    DataManagerService,
    ConfigService,
    ProtobufService,
    ProduccerService,
    EventsService,
  ],
})
export class AppModule {}
