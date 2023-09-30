import { Injectable, Logger } from '@nestjs/common';
import * as Kafka from 'kafkajs';

/**
 * @injectable class to instance interface of kafka
 * Produce service to send data with kafka protocol to brokers and replic
 */
@Injectable()
export class ProduccerService {
  /**
   * Logger instance
   */
  private readonly logger = new Logger(ProduccerService.name);

  /**
   * class to configure kafka producer
   */
  private kafkaInstance: Kafka.Kafka | undefined;

  /**
   * Point instance of kafka producer
   */
  private producerKafka: Kafka.Producer | undefined;

  /**
   * producerService
   * @params null with basic module config to constructor
   */
  constructor() {
    Logger.log(
      `Kafka producer to connection with ms stack ${process.env.NODE_ENV}`,
      ProduccerService.name,
    );

    /**
     * Config brokers from env
     * Config ClientId from env
     * Config Mechanism from env
     */
    const brokers = process.env.KAFKA_BROKERS
      ? process.env.KAFKA_BROKERS.split(',')
      : [];
    const clientId = process.env.KAFKA_CLIENT_ID
      ? process.env.KAFKA_CLIENT_ID
      : 'test_client';
    const username = process.env.KAFKA_SCRAM_USERNAME
      ? process.env.KAFKA_SCRAM_USERNAME
      : '';
    const password = process.env.KAFKA_SCRAM_PASSWORD
      ? process.env.KAFKA_SCRAM_PASSWORD
      : '';

    /**
     * Verify env to config credentials
     */
    if (process.env.NODE_ENV == 'local') {
      this.kafkaInstance = new Kafka.Kafka({
        brokers: brokers,
        clientId: clientId,
      });
    } else if (process.env.NODE_ENV !== 'local') {
      this.kafkaInstance = new Kafka.Kafka({
        clientId: clientId,
        brokers: brokers,
        ssl: true,
        sasl: {
          mechanism: 'scram-sha-512',
          username: username,
          password: password,
        },
      });
    }

    /**
     * Config consumer of kafka
     */
    this.producerKafka = this.kafkaInstance.producer();
  }

  /**
   * Module to send message of kafka brokers
   * @param topic is a string to topic of kafka
   * @payload pyload is a array of config to message for send in kafka
   * @returns null or promise
   */
  async produce(
    topic: string,
    payload: {
      headers: {
        eventName: string;
        source: string;
      };
      key: string;
      value: any;
      timestamp: string;
    }[],
  ) {
    try {
      /**
       * Connect to brokers for send record
       */
      await this.producerKafka.connect();

      /**
       * Send message with producer
       */
      return await this.producerKafka.send({
        topic: topic,
        acks: -1,
        compression: Kafka.CompressionTypes.GZIP,
        messages: payload,
      });
    } catch (error) {
      this.logger.error({
        Title: 'not sended message to brokers',
        Error: `[${error.name}]: ${error.message}`,
      });
      return null;
    }
  }
}
