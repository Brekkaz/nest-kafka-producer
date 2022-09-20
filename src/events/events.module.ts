import { Module } from '@nestjs/common';
import { DataManagerService } from '../data-manager/data-manager.service';
import { ProtobufService } from '../protobuf/protobuf.service';
import { ConsumerModule } from '../consumer/consumer.module';
import { DataManagerModule } from '../data-manager/data-manager.module';
import { ProtobufModule } from '../protobuf/protobuf.module';
import { EventsService } from './events.service';
import { ConsumerService } from 'src/consumer/consumer.service';

@Module({
  imports: [DataManagerModule, ProtobufModule, ConsumerModule],
  providers: [
    EventsService,
    DataManagerService,
    ProtobufService,
    ConsumerService,
    ProtobufService,
  ],
})
export class EventsModule {}
