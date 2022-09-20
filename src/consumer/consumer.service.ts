import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopic,
  Kafka,
} from 'kafkajs';
import { randomUUID } from 'crypto';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka: Kafka;
  private readonly consumers: Consumer[] = [];
  constructor() {
    this.kafka = new Kafka({
      brokers: process.env.KAFKA_BROKERS
        ? process.env.KAFKA_BROKERS.split(',')
        : [],
    });
  }

  async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
    const uuidV4 = randomUUID();

    const groupIdString = `${process.env.APP_NAME}-${uuidV4}`;
    console.log(`GroupIdKafkaConsumer: ${groupIdString}`);

    const consumer = this.kafka.consumer({
      groupId: groupIdString,
    });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect;
    }
  }
}
