import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  create(@Body() dto: CreateSellerDto) {
    return this.sellerService.create(dto);
  }

  @Get()
  findAll() {
    return this.sellerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sellerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(id, updateSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sellerService.delete(id);
  }
}
