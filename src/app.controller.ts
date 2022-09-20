import { Controller, Get } from '@nestjs/common';
import { DataManagerService } from './data-manager/data-manager.service';

@Controller()
export class AppController {
  constructor(private readonly dataManagerService: DataManagerService) {}

  @Get()
  getHello(): string {
    this.dataManagerService.setUserDirectory({
      userID: '123',
      SocketID: 'socket1',
    });
    return 'surprise!';
  }
}
