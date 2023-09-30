/**
 * Enum of protobuf filename enumerator
 * @returns protobuf filename enum
 */
export enum ProtoName {
  HEARTBEAT = 'protoChat.UserPingConnect',
  USER_CONNECTED = 'protoChat.UserConnected',
  USER_DISCONNECTED = 'protoChat.UserSocketDisconnected',
  NEW_MESSAGE = 'protoChat.NewMessageEvent',
  UPDATED_MESSAGE = 'protoChat.UpdateMessageEvent',
  ACTIVITY_DATA = 'protoChat.ActivityData',
  WRITING_MESSAGE = 'protoChat.WritingMessageEvent',
  EXTERNAL_USER_EVENT = 'protoExternal.UserEvent',
  EXTERNAL_USER_MIGRATE_EVENT = 'protoExternal.UserMigrateEvent',
  EXTERNAL_USER_PHOTO_EVENT = 'protoExternal.UserPhoto',
}
