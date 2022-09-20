import { Module } from '@nestjs/common';
import { ProtobufModule } from '../protobuf/protobuf.module';
import { ProducerModule } from '../producer/producer.module';
import { DataManagerService } from './data-manager.service';
import { ProduccerService } from '../producer/produccer.service';
import { ProtobufService } from '../protobuf/protobuf.service';

@Module({
  imports: [ProducerModule, ProtobufModule],
  providers: [DataManagerService, ProduccerService, ProtobufService],
  exports: [],
})
export class DataManagerModule {}
