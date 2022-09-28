import { Module } from '@nestjs/common';
import { ConsumerModule } from '../consumer/consumer.module';
import { DataManagerModule } from '../data-manager/data-manager.module';
import { ProtobufModule } from '../protobuf/protobuf.module';
import { EventsService } from './events.service';

@Module({
  imports: [DataManagerModule, ProtobufModule, ConsumerModule],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
