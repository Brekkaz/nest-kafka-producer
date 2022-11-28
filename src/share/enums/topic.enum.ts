/**
 * Enum of topics for kafka
 * @returns topics enum
 */
export enum Topic {
  USER_CONNECTED = 'KAFKA_TOPIC_USER_CONNECTED',
  USER_DISCONNECTED = 'KAFKA_TOPIC_USER_DISCONNECTED',
  USER_DISCONNECTED_ROUTED = 'KAFKA_TOPIC_USER_DISCONNECTED_ROUTED',
  NEW_MESSAGE = 'KAFKA_TOPIC_NEW_MESSAGE',
  NEW_MESSAGE_ROUTED = 'KAFKA_TOPIC_NEW_MESSAGE_ROUTED',
  UPDATED_MESSAGE = 'KAFKA_TOPIC_MESSAGE_UPDATED',
  UPDATED_MESSAGE_ROUTED = 'KAFKA_TOPIC_MESSAGE_UPDATED_ROUTED',
  MESSAGE_ACTIVITY = 'KAFKA_TOPIC_MESSAGE_ACTIVITY',
  WRITING_MESSAGE = 'KAFKA_TOPIC_WRITING_MESSAGE',
  WRITING_MESSAGE_ROUTED = 'KAFKA_TOPIC_WRITING_MESSAGE_ROUTED',
  USER_SESSION_EVENT = 'USER_SESSION_EVENT',
}