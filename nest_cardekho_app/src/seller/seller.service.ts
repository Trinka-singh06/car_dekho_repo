import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellerService {

  constructor(@InjectRepository(Seller) private sellerRepo:Repository<Seller>){

  }

  async create(dto: CreateSellerDto): Promise<Seller> {
    const seller = this.sellerRepo.create({
      name: dto.name,
      mobile: dto.mobile,
      contactAdderess: dto.contactAdderess,
      email: dto.email,

    });
    return this.sellerRepo.save(seller);
  }

  async findAll(): Promise<Seller[]> {
    return this.sellerRepo.find({relations:['cars']});
  }

  async findOne(id: number): Promise<Seller> {

  const seller = await this.sellerRepo.findOne({
    where: {selllerId:id},
    relations:['cars'],
  });
  if (!seller) {
    throw new NotFoundException(`Seller with ID ${id} not found`);
  }
    return seller;
  }

  async update(id: number, dto: UpdateSellerDto): Promise<Seller> {
    const seller = await this.findOne(id);
    
    Object.assign(seller, dto)
    return this.sellerRepo.save(seller);
  }

  async delete(id: number): Promise<void> {
    const result = await this.sellerRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
  }
  
}
