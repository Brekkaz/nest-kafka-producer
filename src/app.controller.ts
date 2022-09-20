import { Controller, Get } from '@nestjs/common';
import { TestService } from './test/test.service';

@Controller()
export class AppController {
  constructor(private readonly testService: TestService) {}

  @Get()
  getHello(): string {
    /*this.testService
      .create({
        id: 'test3',
        name: 'test2',
      })
      .then(() => console.log('created'))
      .catch((err) => console.log(err));*/

    this.testService
      .findAll()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    return 'surprise!';
  }
}
