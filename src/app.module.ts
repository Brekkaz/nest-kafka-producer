import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProducerModule } from './producer/producer.module';
import { ProtobufModule } from './protobuf/protobuf.module';
import { DataManagerModule } from './data-manager/data-manager.module';

import Configuration from './config/configuration';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      expandVariables: true,
    }),
    //ProducerModule,
    ProtobufModule,
    DataManagerModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
