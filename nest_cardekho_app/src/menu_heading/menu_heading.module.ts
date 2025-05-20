import { Module } from '@nestjs/common';
import { MenuHeadingService } from './menu_heading.service';
import { MenuHeadingController } from './menu_heading.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuHeading } from './entities/menu_heading.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MenuHeading])],
  controllers: [MenuHeadingController],
  providers: [MenuHeadingService],
})
export class MenuHeadingModule {}
