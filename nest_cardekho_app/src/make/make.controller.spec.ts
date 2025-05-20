import { Test, TestingModule } from '@nestjs/testing';
import { MakeController } from './make.controller';
import { MakeService } from './make.service';

describe('MakeController', () => {
  let controller: MakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MakeController],
      providers: [MakeService],
    }).compile();

    controller = module.get<MakeController>(MakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
