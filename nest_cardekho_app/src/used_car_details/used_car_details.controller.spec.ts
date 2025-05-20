import { Test, TestingModule } from '@nestjs/testing';
import { UsedCarDetailsController } from './used_car_details.controller';
import { UsedCarDetailsService } from './used_car_details.service';

describe('UsedCarDetailsController', () => {
  let controller: UsedCarDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsedCarDetailsController],
      providers: [UsedCarDetailsService],
    }).compile();

    controller = module.get<UsedCarDetailsController>(UsedCarDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
