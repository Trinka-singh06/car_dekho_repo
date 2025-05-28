import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { Between, Like, Raw, Repository } from 'typeorm';
import { Make } from 'src/make/entities/make.entity';
import path from 'path';
import * as fs from 'fs';
import { applyPagination } from 'src/common/query-builder.util';

@Injectable()
export class ModelService {
  constructor(@InjectRepository(Model) private modelRepository: Repository<Model>,
    @InjectRepository(Make) private makeRepository: Repository<Make>,
  ) { }

 async getPaginatedUsers(query: any) {
 const qb = this.makeRepository.createQueryBuilder('user');
 applyPagination(qb, query);
 
 const [data, total] = await qb.getManyAndCount();
 return { data, total };
 }
  async findByMakeAndModel(makeId: number, modelName: string) {
    return this.modelRepository.find({
      where: {
        make: { makeId },
        name: Like(`%${modelName}%`),
      },
      relations: ['make', 'variants'],
    });
  }
  

  async filterByBudgetAndBody(min: string, max: string, bodyType: string) {
    return this.modelRepository.find({
      where: {
        price: Raw(alias => `CAST(${alias} AS UNSIGNED) BETWEEN ${min} AND ${max}`),
        body_type: bodyType,
      },
    });
  }

  async findByPriceRange(minPrice: string, maxPrice: string) {
    return this.modelRepository.find({
      where: {
        price: Raw(alias => `CAST(${alias} AS UNSIGNED) BETWEEN ${minPrice} AND ${maxPrice}`),
      },
      relations: ['make', 'variants'],
    });
  }

  async findByBodyType(bodyType: string) {
    return this.modelRepository.find({
      where: {
        body_type: bodyType,
      },
      relations: ['make', 'variants'],
    });
  }
  async findByPriceRangeAndBodyType(minPrice: string, maxPrice: string, bodyType: string) {
    return this.modelRepository.find({
      where: {
        price: Raw(alias => `CAST(${alias} AS UNSIGNED) BETWEEN ${minPrice} AND ${maxPrice}`),
        body_type: bodyType,
      },
      relations: ['make', 'variants'],
    });
  }
  async findByMake(makeId: number) {
    return this.modelRepository.find({
      where: {
        make: { makeId },
      },
      relations: ['make', 'variants'],
    });
  }
  async create(createModelDto: CreateModelDto, imageFile?: Express.Multer.File) {
    const make = await this.makeRepository.findOne({
      where: { makeId: createModelDto.makeId }
    });

    if (!make) {
      throw new Error(`Make with ID ${createModelDto.makeId} not found`);
    }

    const model = this.modelRepository.create({
      name: createModelDto.name,
      price: createModelDto.price,
      engine: createModelDto.engine,
      power: createModelDto.power,
      transmission: createModelDto.transmission,
      torgue: createModelDto.torgue,
      body_type: createModelDto.body_type,
      seating_capacity: createModelDto.seating_capacity,
      launch_status: createModelDto.launch_status,
      year: createModelDto.year,
      mileage: createModelDto.mileage,
      fueltype: createModelDto.fueltype,
      make: make,
    });
    if (imageFile) {
      model.images = imageFile.path.replace(/\\/g, '/');
    }

    return this.modelRepository.save(model);
  }


  async findByFuelType(fueltype: string) {
    return this.modelRepository.find({
      where: { fueltype },
      relations: ['make', 'variants'],
    });
  }


  findAll() {
    return this.modelRepository.find({ relations: ['make', 'variants'] });
  }

  findOne(modelId: number) {
    return this.modelRepository.findOne({

      where: { modelId },
      relations: ['make', 'variants']

    });
  }

  // async update(id: number, updateModelDto: UpdateModelDto, image?: Express.Multer.File) {
  //   const model = await this.modelRepository.findOne({ where: { modelId: id } });

  //   if (!model) {
  //     throw new Error(`Model with ID ${id} not found`);
  //   }


  //   let make;
  //   if (updateModelDto.makeId) {
  //     make = await this.makeRepository.findOne({
  //       where: { makeId: updateModelDto.makeId }
  //     });

  //     if (!make) {
  //       throw new Error(`Make with ID ${updateModelDto.makeId} not found`);
  //     }
  //   }

  //   if (updateModelDto.name) {
  //     model.name = updateModelDto.name;
  //   }

  //   if (make) {
  //     model.make = make;
  //   }


  //   if (image) {

  //     if (model.images) {
  //       const oldPath = path.join(process.cwd(), model.images);
  //       if (fs.existsSync(oldPath)) {
  //         fs.unlinkSync(oldPath);
  //       }
  //     }

  //     model.images = image.path.replace(/\\/g, '/');
  //   }

  //   return this.modelRepository.save(model);
  // }

  async update(id: number, updateModelDto: UpdateModelDto, image?: Express.Multer.File) {
    const model = await this.modelRepository.findOne({ where: { modelId: id } });

    if (!model) {
      throw new Error(`Model with ID ${id} not found`);
    }

    // If makeId is provided
    if (updateModelDto.makeId !== undefined) {
      const make = await this.makeRepository.findOne({
        where: { makeId: updateModelDto.makeId }
      });

      if (!make) {
        throw new Error(`Make with ID ${updateModelDto.makeId} not found`);
      }

      model.make = make;
    }

    // Selectively update only fields provided in the DTO
    if (updateModelDto.name !== undefined) model.name = updateModelDto.name;
    if (updateModelDto.price !== undefined) model.price = updateModelDto.price;
    if (updateModelDto.engine !== undefined) model.engine = updateModelDto.engine;
    if (updateModelDto.power !== undefined) model.power = updateModelDto.power;
    if (updateModelDto.transmission !== undefined) model.transmission = updateModelDto.transmission;
    if (updateModelDto.torgue !== undefined) model.torgue = updateModelDto.torgue;
    if (updateModelDto.body_type !== undefined) model.body_type = updateModelDto.body_type;
    if (updateModelDto.seating_capacity !== undefined) model.seating_capacity = updateModelDto.seating_capacity;
    if (updateModelDto.launch_status !== undefined) model.launch_status = updateModelDto.launch_status;
    if (updateModelDto.year !== undefined) model.year = updateModelDto.year;
    if (updateModelDto.mileage !== undefined) model.mileage = updateModelDto.mileage;
    if (updateModelDto.fueltype !== undefined) model.fueltype = updateModelDto.fueltype;

    // Update image if file is provided
    if (image) {
      if (model.images) {
        const oldPath = path.join(process.cwd(), model.images);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      model.images = image.path.replace(/\\/g, '/');
    }

    return this.modelRepository.save(model);
  }



  remove(id: number) {
    this.modelRepository.delete(id)
    return { deleted: true };
  }
  async updateImage(id: number, images: Express.Multer.File) {
    const model = await this.modelRepository.findOne({ where: { modelId: id } });

    if (!model) {
      throw new Error(`Model with ID ${id} not found`);
    }

    model.images = images.path.replace(/\\/g, '/');
    return this.modelRepository.save(model);
  }

}
