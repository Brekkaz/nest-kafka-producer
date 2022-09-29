import { Controller, Get } from '@nestjs/common';
import { DataManagerService } from './data-manager/data-manager.service';
import { RedisService } from './redis/redis.service';
import { OriginEvent } from './share/enums/OriginEvent';

@Controller()
export class AppController {
  constructor(
    private readonly dataManagerService: DataManagerService,
    private readonly cacheService: RedisService,
  ) {}

  @Get()
  getHello(): string {
    this.dataManagerService.triggerTopic(process.env.KAFKA_TOPIC_SOCKER_USER_CONNECT, {
      originEvent : OriginEvent.System,
      userID : '1',
      userSocketID : 'u123',
    });
    return 'surprise1!';
  }

  @Get('/test2')
  test2(): string {
    this.dataManagerService.triggerTopic(process.env.KAFKA_TOPIC_SOCKER_MESSAGE_PAYLOAD_SEND, {
      originEvent : OriginEvent.System,
      userID : '1',
      socketClientUserToID : '1',
      socketClientUserFromID : '1',
      messageText : '1',
      messageUserFromId : '1',
      messageUserToId : '1',
      messageDateSendFront : '1',
      messageDateSendBack : '1',
    });
    return 'surprise2!';
  }

  @Get('/test3')
  async test3(): Promise<string> {
    let res = await this.cacheService.get('1');
    console.log('@@@@@', res);
    return 'surprise3!';
  }
}
