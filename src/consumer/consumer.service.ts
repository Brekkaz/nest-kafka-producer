import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
import { ProtobufService } from 'src/protobuf/protobuf.service';
import { RedisService } from 'src/redis/redis.service';
import { OriginEvent } from 'src/share/enums/OriginEvent';
import { ProtobufFile } from 'src/share/enums/ProtobufFile';
import { IActivityData } from 'src/share/models/IActivityData';

@Injectable()
export class ConsumerService implements OnApplicationShutdown, OnModuleInit {
  private readonly kafka: Kafka;
  private consumer: Consumer;
  private topics: string[] = [];

  constructor(
    private readonly protobufService: ProtobufService,
    private readonly cacheManager: RedisService,
  ) {
    this.kafka = new Kafka({
      brokers: process.env.KAFKA_BROKERS
        ? process.env.KAFKA_BROKERS.split(',')
        : [],
    });

    this.topics.push(...[
      process.env.KAFKA_TOPIC_SOCKER_MESSAGE_PAYLOAD_SEND + '',
      process.env.KAFKA_TOPIC_SOCKER_USER_CONNECT + ''
    ]);
  }

  async onModuleInit() {
    //connect consumer
    const groupIdString = `${process.env.APP_NAME}`;
    console.log(`GroupIdKafkaConsumer: ${groupIdString}`);

    this.consumer = this.kafka.consumer({
      groupId: groupIdString,
    });
    await this.consumer.connect();

    //subscribe topics
    await this.consumer.subscribe(<ConsumerSubscribeTopics>{
      topics: this.topics
    });

    //handle events
    await this.consumer.run(<ConsumerRunConfig>{
      eachMessage: async (event) => {
        const payload = <IActivityData>this.protobufService.decompressProto(
          ProtobufFile.ActivityData,
          event.message.value,
        );

        if(payload.originEvent==OriginEvent.System){
          try {
            await this.cacheManager.set(
              payload.userID,
              Date.now()
            );
          } catch (error) {
            console.log(error);
          }
        }
      },
    });
  }

  async onApplicationShutdown() {
    await this.consumer.disconnect;
  }
}
