import { Test, TestingModule } from '@nestjs/testing';
import { UsedCarDetailsService } from './used_car_details.service';

describe('UsedCarDetailsService', () => {
  let service: UsedCarDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsedCarDetailsService],
    }).compile();

    service = module.get<UsedCarDetailsService>(UsedCarDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
