import { Module } from '@nestjs/common';
import { ProtobufModule } from 'src/protobuf/protobuf.module';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [ProtobufModule],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class ConsumerModule {}
