import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsedCarDetailDto } from './dto/create-used_car_detail.dto';
import { UpdateUsedCarDetailDto } from './dto/update-used_car_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsedCarDetail } from './entities/used_car_detail.entity';
import { Between, ILike, Like, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Seller } from 'src/seller/entities/seller.entity';

@Injectable()
export class UsedCarDetailsService {

  constructor(
    @InjectRepository(UsedCarDetail) private carRepo: Repository<UsedCarDetail>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Seller) private sellerRepo: Repository<Seller>) {

  }

  async findAll(): Promise<UsedCarDetail[]> {
    return this.carRepo.find({ relations: ['category', 'seller'] });
  }

  async findByCity(city: string): Promise<UsedCarDetail[]> {
    return this.carRepo.find({
      where: { city },
      relations: ['category', 'seller'],
    })
  }
  
  async findOne(carId: number): Promise<UsedCarDetail> {
    return this.carRepo.findOne({
      where: { carId },
      relations: ['category', 'seller']
    });
  }

  async findByPriceRange(minPrice: string, maxPrice: string): Promise<UsedCarDetail[]> {
    return this.carRepo.find({
      where: {
        price: Between(minPrice, maxPrice),
      },
      relations: ['category', 'seller'],
    });
  }
  
  async getAllModels(): Promise<string[]> {
    const models = await this.carRepo
      .createQueryBuilder('car')
      .select('DISTINCT car.name', 'name')
      .getRawMany();
    return models.map(model => model.name);
  }
  

  async findByModel(modelName: string): Promise<UsedCarDetail[]> {
    return this.carRepo.find({
      where: {
        name: Like(`%${modelName}%`),
      },
      relations: ['category', 'seller'],
    });
  }

  async findByModelAndCity(modelName: string, city: string): Promise<UsedCarDetail[]> {
    return await this.carRepo
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.category', 'category')
      .leftJoinAndSelect('car.seller', 'seller')
      .where('LOWER(car.name) LIKE LOWER(:modelName)', { modelName: `%${modelName}%` })
      .andWhere('LOWER(car.city) LIKE LOWER(:city)', { city: `%${city}%` })
      .getMany();
  }
  

  async findByBodyType(bodyType: string): Promise<UsedCarDetail[]> {
    return this.carRepo.find({
      where: {
        body_type: bodyType,
      },
      relations: ['category', 'seller'],
    });
  }
  
  async findByBudgetAndCity(minPrice: string, maxPrice: string, city: string): Promise<UsedCarDetail[]> {
    return this.carRepo.find({
      where: {
        price: Between(minPrice, maxPrice),
        city: city
      },
      relations: ['category', 'seller'],
    });
  }

  // NEW METHOD: Get all cities
  async getAllCities(query?: string): Promise<{ name: string }[]> {
    // Create query builder
    const queryBuilder = this.carRepo
      .createQueryBuilder('car')
      .select('DISTINCT car.city', 'city')
      .where('car.city IS NOT NULL');

    // Add search condition if query parameter is provided
    if (query && query.trim() !== '') {
      queryBuilder.andWhere('LOWER(car.city) LIKE LOWER(:query)', {
        query: `%${query.trim()}%`,
      });
    }

    // Execute query and get results
    const cities = await queryBuilder.getRawMany();

    // Transform results to match the expected format in frontend
    return cities.map((item) => ({ name: item.city }));
  }

  
  async create(dto: CreateUsedCarDetailDto): Promise<UsedCarDetail> {
    const category = await this.categoryRepo.findOneBy({ categoryId: dto.categoryId });
    const seller = await this.sellerRepo.findOneBy({ selllerId: dto.sellerId });

    const car = this.carRepo.create({
      name: dto.name,
      title: dto.title,
      price: dto.price,
      state: dto.state,
      city: dto.city,
      images: dto.images,
      carNumber: dto.carNumber,
      lenght: dto.lenght,
      fuelType: dto.fuelType,
      body_type: dto.body_type,
      registrationYear: dto.registrationYear,
      insurance: dto.insurance,
      seats: dto.seats,
      kmsDriven: dto.kmsDriven,
      Rto: dto.Rto,
      ownership: dto.ownership,
      engine: dto.engine,
      mileage: dto.mileage,
      power: dto.power,
      numberofAirbags: dto.numberofAirbags,
      engineDisplacement: dto.engineDisplacement,
      transmission: dto.transmission,
      yearofManufacture: dto.yearofManufacture,
      category,
      seller,
    });

    return this.carRepo.save(car);
  }

  async update(carId: number, dto: CreateUsedCarDetailDto): Promise<UsedCarDetail> {
    const car = await this.carRepo.findOneBy({ carId });

    if (!car) throw new NotFoundException('Car not found');

    if (dto.categoryId) {
      car.category = await this.categoryRepo.findOneBy({ categoryId: dto.categoryId });
    }

    if (dto.sellerId) {
      car.seller = await this.sellerRepo.findOneBy({ selllerId: dto.sellerId });
    }

    Object.assign(car, dto);
    return this.carRepo.save(car);
  }

  remove(id: number) {
    return this.carRepo.delete(id);
  }
  
}
