import { Global, Module } from '@nestjs/common';
import { ProduccerService } from './produccer.service';

@Global()
@Module({
  providers: [ProduccerService],
  exports: [ProduccerService],
})
export class ProducerModule {}
