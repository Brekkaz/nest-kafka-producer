import { Controller, Get } from '@nestjs/common';
import { DataManagerService } from './data-manager/data-manager.service';
import { TestService } from './test/test.service';

@Controller()
export class AppController {
  constructor(
    private readonly testService: TestService,
    private readonly dataManagerService: DataManagerService,
  ) {}

  @Get()
  getHello(): string {
    this.dataManagerService.setUserDirectory({
      userID: 'string',
      SocketID: 'string',
    });
    return 'surprise!';
  }
}
