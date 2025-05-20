import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>) {

  }

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCategoryDto)
    return this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.find({relations:['makes', 'menuheading', 'cars', 'cars.seller']});
  }

  findOne(categoryId: number) {
    return this.categoryRepo.findOne({ where: { categoryId }, relations:['menuheading','makes', 'cars', 'cars.seller', 'makes.models', 'makes.models.variants'] });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    this.categoryRepo.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  remove(id: number) {
    this.categoryRepo.delete(id);
    return { deleted: true };
  }
}
