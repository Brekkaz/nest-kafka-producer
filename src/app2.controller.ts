import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { DataManagerService } from './data-manager/data-manager.service';
import { ContentType } from './share/enums/contentType.enum';
import { ExternalTopic } from './share/enums/externalTopic.enum';
import { MessageType } from './share/enums/messageType.enum';
import { ProtoName } from './share/enums/protoName.enum';
import { Topic } from './share/enums/topic.enum';
import { INewMessage } from './share/interface/INewMessage';


@Controller()
export class App2Controller {

  constructor(
    private readonly dataManagerService: DataManagerService,
  ) { }

  @Get('/2/test1')
  test1(): any {
    this.dataManagerService.triggerTopic(
      'ms-comments-create',
      ProtoName.USER_DISCONNECTED,
      {
        originEvent: 'user',
        userId: '1',
        userSocketId: 'socket1',
        getwayUuid: 'g1',
      },
    );

    return 'surprise1!';
  }

}
