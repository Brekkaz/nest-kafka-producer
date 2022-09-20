export interface IMessagePayload {
  OriginEvent?: string;
  socketClientUserToID?: string;
  socketClientUserFromID?: string;
  messageText?: string;
  messageUserFromId?: string;
  messageUserToId?: string;
  messageDateSendFront?: string;
  messageDateSendBack?: string;
}
