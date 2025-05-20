import { Injectable } from '@nestjs/common';
import { CreateMenuHeadingDto } from './dto/create-menu_heading.dto';
import { UpdateMenuHeadingDto } from './dto/update-menu_heading.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuHeading } from './entities/menu_heading.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuHeadingService {
  constructor(@InjectRepository(MenuHeading) private menuRepository:Repository<MenuHeading>){

  }
  create(createMenuHeadingDto: CreateMenuHeadingDto) {
     const menu = this.menuRepository.create(createMenuHeadingDto)
    return this.menuRepository.save(menu) ;
  }

  findAll() {
    return this.menuRepository.find({relations:['category']});
  }

  findOne(menuId: number) {
    return this.menuRepository.findOne({where:{menuId}, relations:['category', 'category.makes', 'category.makes.models','category.makes.models.variants', 'category.cars.seller']});
  }

  update(id: number, updateMenuHeadingDto: UpdateMenuHeadingDto) {
    this.menuRepository.update(id, updateMenuHeadingDto)
    return this.findOne(id);
  }

  remove(id: number) {
    this.menuRepository.delete(id)
    return {deleted:true};
  }
}
