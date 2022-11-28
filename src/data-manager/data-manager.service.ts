import { Injectable } from '@nestjs/common';
import { ProduccerService } from '../producer/produccer.service';
import { ProtobufService } from '../protobuf/protobuf.service';
import { randomUUID } from 'crypto';
import { ProtoName } from 'src/share/enums/protoName.enum';

@Injectable()
export class DataManagerService {
  constructor(
    private kafkaProduccerService: ProduccerService,
    private protobufService: ProtobufService,
  ) {}

  async triggerTopic(topic: string, proto: ProtoName, data: any) {
    console.log('topic ', topic);

    try {
      const message = this.protobufService.generateProto(proto, data);

      const uuidV4 = randomUUID();

      await this.kafkaProduccerService.produce(topic, [
        {
          headers: {
            eventName: topic,
            source: process.env.KAFKA_CLIENT_ID
              ? process.env.KAFKA_CLIENT_ID
              : 'test_client',
          },
          key: `${uuidV4}`,
          value: message,
          timestamp: '' + Date.now(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}
