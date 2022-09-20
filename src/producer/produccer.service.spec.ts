import { Test, TestingModule } from '@nestjs/testing';
import { ProduccerService } from './produccer.service';

describe('ProduccerService', () => {
  let service: ProduccerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProduccerService],
    }).compile();

    service = module.get<ProduccerService>(ProduccerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
