import { Test, TestingModule } from '@nestjs/testing';
import { CarSellRequestService } from './car-sell-request.service';

describe('CarSellRequestService', () => {
  let service: CarSellRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarSellRequestService],
    }).compile();

    service = module.get<CarSellRequestService>(CarSellRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
