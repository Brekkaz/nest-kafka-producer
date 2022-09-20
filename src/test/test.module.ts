import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CronosSchema } from './cronos.schema';
import { TestService } from './test.service';

@Module({
  imports: [
    DynamooseModule.forFeature([{ name: 'cronos', schema: CronosSchema }]),
  ],
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
