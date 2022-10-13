import { Injectable } from '@nestjs/common';
import { ProduccerService } from '../producer/produccer.service';
import { ProtobufService } from '../protobuf/protobuf.service';
import { randomUUID } from 'crypto';
import { ProtobufFile } from 'src/share/enums/ProtobufFile';

@Injectable()
export class DataManagerService {
  constructor(
    private kafkaProduccerService: ProduccerService,
    private protobufService: ProtobufService,
  ) {}

  async triggerTopic(topic: string, data: any) {
    try {
      const message = this.protobufService.generateProto(
        topic == process.env.KAFKA_TOPIC_SOCKER_USER_CONNECT
          ? ProtobufFile.UserSocketConnected
          : ProtobufFile.MessagePayload,
        data,
      );

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
