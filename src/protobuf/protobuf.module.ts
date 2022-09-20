import { Module } from '@nestjs/common';
import { ProtobufService } from './protobuf.service';

@Module({
  providers: [ProtobufService],
})
export class ProtobufModule {}
