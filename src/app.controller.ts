import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { DataManagerService } from './data-manager/data-manager.service';
import { ExternalTopic } from './share/enums/externalTopic.enum';
import { ProtoName } from './share/enums/protoName.enum';
import { Topic } from './share/enums/topic.enum';

interface AuthenticationService {
  checkToken(data: { token: string }): Observable<any>;
}

@Controller()
export class AppController implements OnModuleInit {
  private authenticationService: AuthenticationService;

  constructor(
    private readonly dataManagerService: DataManagerService,
    @Inject('AUTH_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authenticationService = this.client.getService<AuthenticationService>(
      'AuthenticationService',
    );
  }

  @Get('/test1')
  test1(): any {
    this.dataManagerService.triggerTopic(
      Topic.USER_CONNECTED,
      ProtoName.USER_CONNECTED,
      {
        originEvent: 'user',
        userId: '1',
        userSocketId: 'socket1',
        getwayUuid: 'g1',
      },
    );
    return 'surprise1!';
  }

  @Get('/test2')
  test2(): any {
    this.dataManagerService.triggerTopic(
      Topic.USER_DISCONNECTED,
      ProtoName.USER_DISCONNECTED,
      {
        originEvent: 'user',
        userId: '1',
        userSocketId: 'socket1',
        getwayUuid: 'g1',
      },
    );
    return 'surprise2!';
  }

  @Get('/test3')
  test3(): any {
    this.dataManagerService.triggerTopic(
      Topic.UPDATED_MESSAGE,
      ProtoName.UPDATED_MESSAGE,
      {
        originEvent: 'user',
        userId: '1',
        originGateway: 'g1',
        originSocket: 's1',
        updateType: 'received',
        messageId: '1',
        updateDate: '24-10-2022',
        sendingUserId: '1',
        receivingUserId: '2',
        sendingDate: '24-10-2022',
      },
    );
    return 'surprise3!';
  }

  @Get('/test4')
  test4(): any {
    this.dataManagerService.triggerTopic(
      Topic.WRITING_MESSAGE,
      ProtoName.WRITING_MESSAGE,
      {
        originEvent: 'user',
        userId: '1',
        sendingMessageUserId: '1',
        receivingMessageUserId: '1',
      },
    );
    return 'surprise4!';
  }

  @Get('/test5')
  test5(): any {
    this.dataManagerService.triggerTopic(
      ExternalTopic.USER_EVENT,
      ProtoName.EXTERNAL_USER_EVENT,
      {
        eventType: 1,
        userId: 'user1',
        status: true,
      },
    );
    return 'surprise5!';
  }

  @Get('/test6')
  public test6() {
    return this.authenticationService.checkToken({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpaXMiOiJNUy1BVVRIRU5USUNBVElPTi1BUkVTIiwianRpIjoiODM2MDQ0OGUtZjZkZi00ZmZmLTg5YWUtNjMyZDYwMGQ2MDcwIiwic3ViIjoidXNlcjEiLCJleHAiOjE2Njc3MDQzOTMsInJqdGkiOiI4YjI0NGRiMi1kZmRjLTQ0YWMtOGM0Yi1mYjM4M2E5YmJlMDMiLCJpYXQiOjE2Njc2OTcxOTN9.b7I1x23HF7DXVzBwMyz_YAaCLn8MJ8oW40eyfOEZl1M' });
  }
}
