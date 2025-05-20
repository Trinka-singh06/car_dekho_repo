import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { Make } from 'src/make/entities/make.entity';
import { Model } from 'src/model/entities/model.entity';
import { Variant } from 'src/variant/entities/variant.entity';
import { City } from './entities/city.entity';
import { CarType } from './entities/cartype.entity';

@Injectable()
export class CarService {

  constructor(  @InjectRepository(Car)
  private carRepository: Repository<Car>,
  @InjectRepository(Make)
  private makeRepository: Repository<Make>,
  @InjectRepository(Model)
  private modelRepository: Repository<Model>,
  @InjectRepository(Variant)
  private variantRepository: Repository<Variant>,
  @InjectRepository(City)
  private cityRepository: Repository<City>,
  @InjectRepository(CarType)
  private carTypeRepository: Repository<CarType>){

  }
 // Helper function to convert budget range string to min and max values
 private parseBudgetRange(range: string): { min: number; max: number } {
  switch (range) {
    case '0-2 lakh':
      return { min: 0, max: 200000 };
    case '2-3 lakh':
      return { min: 200000, max: 300000 };
    case '3-5 lakh':
      return { min: 300000, max: 500000 };
    case '5-8 lakh':
      return { min: 500000, max: 800000 };
    case '8-10 lakh':
      return { min: 800000, max: 1000000 };
    case '10+ lakhs':
      return { min: 1000000, max: 100000000 }; // Setting a high max value
    default:
      return { min: 0, max: 100000000 };
  }
}

async getCarTypesByBudget(budgetRange: string) {
  const { min, max } = this.parseBudgetRange(budgetRange);
  
  return this.carTypeRepository.find({
    where: [
      { minBudget: Between(min, max) },
      { maxBudget: Between(min, max) },
      { 
        minBudget: LessThan(min),
        maxBudget: MoreThan(max) 
      }
    ]
  });
}


 // Find new cars by budget range and car type
 async findNewCarsByBudgetAndType(budgetRange: string, carType: string) {
  const { min, max } = this.parseBudgetRange(budgetRange);
  
  return this.carRepository.find({
    where: {
      isNew: true,
      variant: {
        price: Between(min, max),
        model: {
          carType: {
            name: carType
          }
        }
      },
    },
    relations: ['variant', 'variant.model', 'variant.model.make', 'variant.model.carType'],
  });
}
// Find new cars by budget range

  // Find new cars by budget range
  async findNewCarsByBudget(budgetRange: string) {
    const { min, max } = this.parseBudgetRange(budgetRange);
    
    return this.carRepository.find({
      where: {
        isNew: true,
        variant: {
          price: Between(min, max),
        },
      },
      relations: ['variant', 'variant.model', 'variant.model.make', 'variant.model.carType'],
    });
  }
  async findNewCarsByModel(brand: string, model: string) {
    const make = await this.makeRepository.findOne({ where: { name: brand } });
    if (!make) return [];
  
    const carModel = await this.modelRepository.findOne({
      where: {
        name: model,
        make: { id: make.id }
      },
      relations: ['make'],
    });
    if (!carModel) return [];
  
    // Use QueryBuilder for accurate filtering
    return this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.variant', 'variant')
      .leftJoinAndSelect('variant.model', 'model')
      .leftJoinAndSelect('model.make', 'make')
      .leftJoinAndSelect('model.carType', 'carType')
      .where('car.isNew = :isNew', { isNew: true })
      .andWhere('model.modelId = :modelId', { modelId: carModel.modelId })
      .andWhere('make.makeId = :makeId', { makeId: make.makeId })
      .getMany();
  }
  
// Find used cars by budget and city
async findUsedCarsByBudget(budgetRange: string, city: string) {
  const { min, max } = this.parseBudgetRange(budgetRange);
  
  return this.carRepository.find({
    where: {
      isNew: false,
      price: Between(min, max),
      city: { name: city },
    },
    relations: ['variant', 'variant.model', 'variant.model.make', 'variant.model.carType', 'city'],
  });
}
// Find used cars by model and city
async findUsedCarsByModel(brand: string, model: string, city: string) {
  const make = await this.makeRepository.findOne({ where: { name: brand } });
  if (!make) return [];
  
  const carModel = await this.modelRepository.findOne({
    where: {
      name: model,
      make: { id: make.id }
    }
  });
  if (!carModel) return [];

  return this.carRepository.find({
    where: {
      isNew: false,
      variant: {
        model: { id: carModel.id },
      },
      city: { name: city },
    },
    relations: ['variant', 'variant.model', 'variant.model.make', 'variant.model.carType', 'city'],
  });
}

// Get all available budget ranges
async getBudgetRanges() {
  return [
    '0-2 lakh',
    '2-3 lakh',
    '3-5 lakh',
    '5-8 lakh',
    '8-10 lakh',
    '10+ lakhs',
  ];
}
async getCarTypes() {
  return this.carTypeRepository.find();
}
// Get all available brands (makes)
async getAllBrands() {
  return this.makeRepository.find();
}

 // Get models by brand
 async getModelsByBrand(brandId: number) {
  return this.modelRepository.find({
    where: { make: { makeId: brandId } },
    relations: ['carType']
  });
}

// Get all cities (for used cars)
async getCities() {
  return this.cityRepository.find();
}

// Seed car types if they don't exist
async seedCarTypes() {
  const existingTypes = await this.carTypeRepository.count();
  
  if (existingTypes === 0) {
    const carTypes = [
      { name: 'Hatchback', minBudget: 0, maxBudget: 500000, description: 'Compact cars with a hatch-type rear door' },
      { name: 'Sedan', minBudget: 300000, maxBudget: 800000, description: 'Four-door passenger car with a separate trunk' },
      { name: 'SUV', minBudget: 500000, maxBudget: 2000000, description: 'Sport Utility Vehicle with higher ground clearance' },
      { name: 'MUV', minBudget: 600000, maxBudget: 1500000, description: 'Multi-Utility Vehicle designed for family use' },
      { name: 'Luxury', minBudget: 1000000, maxBudget: 100000000, description: 'Premium cars with high-end features' }
    ];
    
    return this.carTypeRepository.save(carTypes);
  }
  
  return this.carTypeRepository.find();
}
}
