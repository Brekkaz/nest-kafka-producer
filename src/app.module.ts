import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProducerModule } from './producer/producer.module';
import { ProtobufModule } from './protobuf/protobuf.module';
import { DataManagerModule } from './data-manager/data-manager.module';

import Configuration from './config/configuration';
import { ConsumerModule } from './consumer/consumer.module';
import { AppController } from './app.controller';
import { DynamooseModule } from 'nestjs-dynamoose';
import { TestModule } from './test/test.module';
import { EventsModule } from './events/events.module';

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
    ConfigModule.forRoot({
      load: [Configuration],
      expandVariables: true,
    }),
    ProducerModule,
    ProtobufModule,
    DataManagerModule,
    ConsumerModule,
    TestModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
