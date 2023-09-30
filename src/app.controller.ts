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

interface AuthenticationService {
  checkToken(data: { token: string }): Observable<any>;
}

@Controller()
export class AppController implements OnModuleInit {
  private authenticationService: AuthenticationService;

  constructor(
    private readonly dataManagerService: DataManagerService,
    @Inject('AUTH_PACKAGE') private client: ClientGrpc,
  ) { }

  onModuleInit() {
    this.authenticationService = this.client.getService<AuthenticationService>(
      'AuthenticationService',
    );
  }

  @Get('/test1')
  test1(): any {
    const newMessage: INewMessage = {
      userId: '1234567890',
      originGateway: '2f6c40f9-0a2a-4e1a-a260-d38cbb5c0c9a',
      originSocket: 'In70Dfzj6hxeooMKAAAH',
      messageId: '9189918f-3ef9-4d23-8e00-82efe7f1b457',
      forwardedMessageId: 'lorem',
      replyMessageId: 'lorem',
      replyStoryUrl: 'https://www.google.com/',
      messageType: MessageType.BASIC,
      contentType: ContentType.TEXT,
      messageMediaUrl: 'https://i.picsum.photos/id/731/200/300.jpg?hmac=Fx9GInoTSfdH0XzB-TGwIOkNAM6ULVS-SQbuWn9q8nY',
      messageText: 'surprise 3!!!!!!!',
      sendingMessageUserId: '9189918f-3ef9-4d23-8e00-82efe7f1b457',
      receivingMessageUserId: '1234567890',
      sendingDate: '2022-10-29T04:23:35.264Z',
      /*sendingMessageSockets: [{
        uuid: '27467250-67e5-45bf-b7de-6e1464696bbf',
        sockets: ['In70Dfzj6hxeooMKAAAH', 'xhckGGRAaLyRdW2rAAAD']
      }, {
        uuid: 'trehrthrthrth',
        sockets: ['343423', '213412412']
      }],*/
      receivingMessageSockets: [
        {
          uuid: null,
          sockets: []
        }
      ]
    }

    this.dataManagerService.triggerTopic(
      Topic.NEW_MESSAGE_ROUTED,
      ProtoName.NEW_MESSAGE,
      newMessage
    );
    return 'surprise1!';
  }

  @Get('/test2')
  test2(): any {
    this.dataManagerService.triggerTopic(
      'ms-wallet-funds',
      ProtoName.USER_CONNECTED,
      {
        userId: 'lorem',
        gatewayId: 'ipsum',
        socketId: 'dolor',
      },
    );
    return 'surprise2!';
  }

  @Get('/test3')
  public test3() {
    return this.authenticationService.checkToken({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpaXMiOiJNUy1BVVRIRU5USUNBVElPTi1BUkVTIiwianRpIjoiODM2MDQ0OGUtZjZkZi00ZmZmLTg5YWUtNjMyZDYwMGQ2MDcwIiwic3ViIjoidXNlcjEiLCJleHAiOjE2Njc3MDQzOTMsInJqdGkiOiI4YjI0NGRiMi1kZmRjLTQ0YWMtOGM0Yi1mYjM4M2E5YmJlMDMiLCJpYXQiOjE2Njc2OTcxOTN9.b7I1x23HF7DXVzBwMyz_YAaCLn8MJ8oW40eyfOEZl1M' });
  }

  @Get('/test4')
  test4(): any {
    this.dataManagerService.triggerTopicJson(
      "SMART_CONTRACT_MANAGER",
      {
        account: 'llorem',
        status: 'inactive',
      },
    );
    return 'surprise4!';
  }
}
