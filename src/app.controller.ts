import { Controller, Get } from '@nestjs/common';
import { DataManagerService } from './data-manager/data-manager.service';
import { OriginEvent } from './share/enums/OriginEvent';

@Controller()
export class AppController {
  constructor(private readonly dataManagerService: DataManagerService) {}

  @Get('/test1')
  getHello(): any {
    /*this.dataManagerService.triggerTopic(process.env.KAFKA_TOPIC_SOCKER_USER_CONNECT, {
      originEvent : OriginEvent.User,
      userID : '1',
      userSocketID : 'u123',
    });*/
    return new Date().toUTCString(); //'surprise1!';
  }

  @Get('/test2')
  test2(): string {
    this.dataManagerService.triggerTopic(
      process.env.KAFKA_TOPIC_SOCKER_MESSAGE_PAYLOAD_SEND,
      {
        originEvent: OriginEvent.User,
        userID: '2',
        socketClientUserToID: '1',
        socketClientUserFromID: '1',
        messageText: '1',
        messageUserFromId: '1',
        messageUserToId: '1',
        messageDateSendFront: '1',
        messageDateSendBack: '1',
      },
    );
    return 'surprise2!';
  }
}
