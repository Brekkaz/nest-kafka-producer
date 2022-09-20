import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../consumer/consumer.service';
import { ProtobufService } from '../protobuf/protobuf.service';
import { IMessagePayload } from '../share/models/Message';
import { DataManagerService } from '../data-manager/data-manager.service';

@Injectable()
export class EventsService implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly protobufService: ProtobufService,
    private readonly dataManagerService: DataManagerService,
  ) {}

  async getMessagePayloads() {
    await this.consumerService.consume(
      {
        topic: '' + process.env.KAFKA_TOPIC_SOCKER_USER_CONNECT,
      },
      {
        eachMessage: async (event) => {
          const payload: IMessagePayload = this.protobufService.decompressProto(
            'MessagePayload',
            event.message.value,
          );

          console.log('Payload decompress');
          console.log(payload);
        },
      },
    );
  }

  async onModuleInit() {
    //await this.getMessagePayloads();
  }
}
