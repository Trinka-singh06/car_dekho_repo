import { Module } from '@nestjs/common';
import { UsedCarDetailsService } from './used_car_details.service';
import { UsedCarDetailsController } from './used_car_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsedCarDetail } from './entities/used_car_detail.entity';
import { Category } from 'src/category/entities/category.entity';
import { Seller } from 'src/seller/entities/seller.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UsedCarDetail, Category, Seller])],
  controllers: [UsedCarDetailsController],
  providers: [UsedCarDetailsService],
})
export class UsedCarDetailsModule {}
