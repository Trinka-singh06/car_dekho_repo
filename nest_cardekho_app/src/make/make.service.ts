import { Injectable } from '@nestjs/common';
import { CreateMakeDto } from './dto/create-make.dto';
import { UpdateMakeDto } from './dto/update-make.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Make } from './entities/make.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class MakeService {
  constructor(@InjectRepository(Make) private makeRepo:Repository<Make>){}

  create(createMakeDto: CreateMakeDto) {

    const make = this.makeRepo.create(createMakeDto)
    
    return this.makeRepo.save(make);
  }

  findAll() {
    return this.makeRepo.find({relations:['category','models']});
  }

  findOne(makeId: number) {
    return this.makeRepo.findOne( {
       where : { makeId },
       relations:['category','models', 'models.variants'] });
  }


  
  async update(id: number, updateMakeDto: UpdateMakeDto) {
    const updateData: Partial<Make> = {};
  
    if (updateMakeDto.logo !== undefined) {
      updateData.logo = updateMakeDto.logo;
    }
  
    if (updateMakeDto.name !== undefined) {
      updateData.name = updateMakeDto.name;
    }
  
    if (updateMakeDto.categoryId !== undefined) {
      updateData.category = { categoryId: updateMakeDto.categoryId } as any;
    }
  
    // ✅ Prevent empty updates
    if (Object.keys(updateData).length === 0) {
      throw new Error('No update values provided.');
    }
  
    await this.makeRepo.update(id, updateData);
    return this.findOne(id);
  }
  
  

  remove(id: number) {
    this.makeRepo.delete(id)
    return {deleted:true};
  }
}
