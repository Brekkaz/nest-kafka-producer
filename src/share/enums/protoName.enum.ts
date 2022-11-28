/**
 * Enum of protobuf filename enumerator
 * @returns protobuf filename enum
 */
export enum ProtoName {
  USER_CONNECTED = 'protoChat.UserSocketConnected',
  USER_DISCONNECTED = 'protoChat.UserSocketDisconnected',
  NEW_MESSAGE = 'protoChat.NewMessageEvent',
  UPDATED_MESSAGE = 'protoChat.UpdateMessageEvent',
  ACTIVITY_DATA = 'protoChat.ActivityData',
  WRITING_MESSAGE = 'protoChat.WritingMessageEvent',
  EXTERNAL_USER_EVENT = 'protoExternal.UserEvent',
}
