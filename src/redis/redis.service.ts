import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  /**
   * Redis config envs
   */
  private redisUrl: string;

  /**
   * Redis client instance
   */
  private redisClient;

  constructor() {
    this.redisUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
  }

  async onModuleInit() {
    this.redisClient = createClient({
      url: this.redisUrl,
    });
    this.redisClient.on('error', (err) =>
      console.log('Redis Client Error', err),
    );

    await this.redisClient.connect();
  }

  async get(key) {
    return await this.redisClient.get(key);
  }

  async set(ket, value) {
    await this.redisClient.set(ket, value);
  }

  async del(key) {
    await this.redisClient.del(key);
  }
}