import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProducerModule } from './producer/producer.module';
import { ProtobufModule } from './protobuf/protobuf.module';
import { DataManagerModule } from './data-manager/data-manager.module';

import Configuration from './config/configuration';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { App2Controller } from './app2.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      expandVariables: true,
    }),
    ProducerModule,
    ProtobufModule,
    DataManagerModule,
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'protoGrpc',
          protoPath: join(
            __dirname,
            'protobuf/proto-files-bifrost/protoGrpc.proto',
          ),
          url:'localhost:5000'
        },
      },
    ]),
  ],
  controllers: [AppController, App2Controller],
  providers: [ConfigService],
})
export class AppModule {}
