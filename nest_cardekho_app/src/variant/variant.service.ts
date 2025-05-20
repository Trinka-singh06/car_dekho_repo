import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import { Between, Equal, Repository } from 'typeorm';
import { Model } from 'src/model/entities/model.entity';
import { Make } from 'src/make/entities/make.entity';

@Injectable()
export class VariantService {
  
  constructor(@InjectRepository(Variant) private variantRepository: Repository<Variant>,
    @InjectRepository(Model) private modelRepository: Repository<Model>,
    @InjectRepository(Model) private makeRepository: Repository<Model>
  ) { }

    
    async create(createVariantDto: CreateVariantDto, file?: Express.Multer.File) {
      const { modelId, ...variantData } = createVariantDto;
    
      // Fix: Use `modelId` instead of `id`
      const model = await this.modelRepository.findOne({ where: { modelId } });
    
      const variant = this.variantRepository.create({ ...variantData, model });
    
      if (file) {
        variant.images = file.filename; // Save filename instead of full path
      }
    
      return this.variantRepository.save(variant);
    }
    

  findAll() {
    return this.variantRepository.find({ relations: ['model'] });
  }

  findOne(id: number) {
    return this.variantRepository.findOne({ where: { id }, relations: ['model'] });
 }
 

  update(id: number, updateVariantDto: UpdateVariantDto) {
    this.variantRepository.update(id, updateVariantDto)
    return this.variantRepository.findOne({where:{id}});
  }

  remove(id: number) {
    this.variantRepository.delete(id)
    return { deleted:true };
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<any[]> {
    // First, let's see what's actually in the database with a direct SQL query
    console.log(`Searching for variants with price between ${minPrice} and ${maxPrice}`);
    
    try {
      // Direct SQL query to see all price values in the database
      const allPrices = await this.variantRepository.query('SELECT id, price FROM variant');
      console.log('All prices in database:', allPrices);
      
      // Direct SQL query with your filter
      const directResults = await this.variantRepository.query(
        'SELECT * FROM variant WHERE price >= ? AND price <= ?',
        [minPrice, maxPrice]
      );
      console.log('Direct SQL results:', directResults);
      
      return directResults;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }



  // Get variants by body type
  async findByBodyType(bodyType: string): Promise<Variant[]> {
    return this.variantRepository.find({
      where: { body_type: bodyType },
      relations: ['model', 'model.make']
    });
  }
    // Get variants by fuel type
    async findByFuelType(fuelType: string): Promise<Variant[]> {
      return this.variantRepository.find({
        where: { fueltype: fuelType },
        relations: ['model', 'model.make']
      });
    }
   // Get variants by brand/make
   async findByMake(makeId: number): Promise<Variant[]> {
    return this.variantRepository
      .createQueryBuilder('variant')
      .leftJoinAndSelect('variant.model', 'model')
      .leftJoinAndSelect('model.make', 'make')
      .where('make.makeId = :makeId', { makeId })
      .getMany();
  }
  
  // Get variants by seating capacity
  async findBySeatingCapacity(capacity: number): Promise<Variant[]> {
    return this.variantRepository.find({
      where: { seating_capacity: capacity },
      relations: ['model', 'model.make']
    });
  }
   // Get variants by launch status
   async findByLaunchStatus(status: string): Promise<Variant[]> {
    return this.variantRepository.find({
      where: { launch_status: status },
      relations: ['model', 'model.make']
    });
  }


  async updateImage(id: number, file: Express.Multer.File) {
    const variant = await this.variantRepository.findOne({ where: { id } });
  
    if (!variant) {
      throw new NotFoundException(`Variant with ID ${id} not found`);
    }
  
    variant.images = file.filename;
  
    return this.variantRepository.save(variant);
  }
  
   
}
