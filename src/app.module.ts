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
import { DynamooseModule } from 'nestjs-dynamoose';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    DynamooseModule.forRoot({
      aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      },
      /*local?: boolean | string;
      ddb?: DynamoDB;
      table?: TableOptionsOptional;
      logger?: boolean | LoggerService;*/
    }),
    TestModule,
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
