import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 3002;
  console.log(`app runnning in port: ${port}`);

  await app.listen(port);
}
bootstrap();
