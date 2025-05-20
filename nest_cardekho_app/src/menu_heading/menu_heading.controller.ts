import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuHeadingService } from './menu_heading.service';
import { CreateMenuHeadingDto } from './dto/create-menu_heading.dto';
import { UpdateMenuHeadingDto } from './dto/update-menu_heading.dto';

@Controller('menu-heading')
export class MenuHeadingController {
  constructor(private readonly menuHeadingService: MenuHeadingService) {}

  @Post()
  create(@Body() createMenuHeadingDto: CreateMenuHeadingDto) {
    return this.menuHeadingService.create(createMenuHeadingDto);
  }

  @Get()
  findAll() {
    return this.menuHeadingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuHeadingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMenuHeadingDto: UpdateMenuHeadingDto) {
    return this.menuHeadingService.update(id, updateMenuHeadingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuHeadingService.remove(+id);
  }
}
