import { Test, TestingModule } from '@nestjs/testing';
import { CarSellRequestController } from './car-sell-request.controller';
import { CarSellRequestService } from './car-sell-request.service';

describe('CarSellRequestController', () => {
  let controller: CarSellRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarSellRequestController],
      providers: [CarSellRequestService],
    }).compile();

    controller = module.get<CarSellRequestController>(CarSellRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
