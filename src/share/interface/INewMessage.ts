import { ContentType } from '../enums/contentType.enum';
import { MessageType } from '../enums/messageType.enum';
import { IGatewayRedis } from './IGatewayRedis';

/**
 * Interface that parse locally the decoding result of new message protobuf
 */
export interface INewMessage {
  userId: string;
  originGateway: string;
  originSocket: string;
  messageId?: string;
  forwardedMessageId: string;
  replyMessageId: string;
  replyStoryUrl: string;
  messageType: MessageType;
  contentType: ContentType;
  messageMediaUrl: string;
  messageText: string;
  sendingMessageUserId: string;
  receivingMessageUserId: string;
  sendingDate: string;
  sendingMessageSockets?: IGatewayRedis[];
  receivingMessageSockets?: IGatewayRedis[];
}
