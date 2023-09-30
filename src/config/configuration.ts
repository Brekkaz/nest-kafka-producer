export default () => ({
  redisUrl: process.env.REDIS_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_TTL: process.env.REDIS_TTL,
  KAFKA_BROKERS: process.env.KAFKA_BROKERS,
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
  KAFKA_SCRAM_USERNAME: process.env.KAFKA_SCRAM_USERNAME,
  KAFKA_SCRAM_PASSWORD: process.env.KAFKA_SCRAM_PASSWORD,
  KAFKA_SCRAM_MECHANISM: process.env.KAFKA_SCRAM_MECHANISM,
});
