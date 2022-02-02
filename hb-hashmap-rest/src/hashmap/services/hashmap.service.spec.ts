import { Test, TestingModule } from '@nestjs/testing';
import { HashmapService } from './hashmap.service';

describe('HashmapService', () => {
  let service: HashmapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashmapService],
    }).compile();

    service = module.get<HashmapService>(HashmapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
