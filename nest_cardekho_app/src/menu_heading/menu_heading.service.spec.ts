import { Test, TestingModule } from '@nestjs/testing';
import { MenuHeadingService } from './menu_heading.service';

describe('MenuHeadingService', () => {
  let service: MenuHeadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuHeadingService],
    }).compile();

    service = module.get<MenuHeadingService>(MenuHeadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
