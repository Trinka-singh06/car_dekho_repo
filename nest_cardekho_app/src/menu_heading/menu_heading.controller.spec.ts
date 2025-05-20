import { Test, TestingModule } from '@nestjs/testing';
import { MenuHeadingController } from './menu_heading.controller';
import { MenuHeadingService } from './menu_heading.service';

describe('MenuHeadingController', () => {
  let controller: MenuHeadingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuHeadingController],
      providers: [MenuHeadingService],
    }).compile();

    controller = module.get<MenuHeadingController>(MenuHeadingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
