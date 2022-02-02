import { Test, TestingModule } from '@nestjs/testing';
import { HashmapController } from './hashmap.controller';
import { HashmapService } from './services/hashmap.service';

describe('HashmapController', () => {
  let controller: HashmapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HashmapController],
      providers: [HashmapService],
    }).compile();

    controller = module.get<HashmapController>(HashmapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
