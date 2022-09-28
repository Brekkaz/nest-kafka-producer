import { Module } from '@nestjs/common';
import { ProtobufModule } from '../protobuf/protobuf.module';
import { ProducerModule } from '../producer/producer.module';
import { DataManagerService } from './data-manager.service';

@Module({
  imports: [ProducerModule, ProtobufModule],
  providers: [DataManagerService],
  exports: [DataManagerService],
})
export class DataManagerModule {}
