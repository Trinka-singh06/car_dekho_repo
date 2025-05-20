import { Module } from '@nestjs/common';
import { CarSellRequestService } from './car-sell-request.service';
import { CarSellRequestController } from './car-sell-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarSellRequest } from './entities/car-sell-request.entity';
import { User } from 'src/auth/user.entity';
import { UsedCarDetail } from 'src/used_car_details/entities/used_car_detail.entity';
import { Seller } from 'src/seller/entities/seller.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarSellRequest, User, UsedCarDetail, Seller, Category]),
  ],
  controllers: [CarSellRequestController],
  providers: [CarSellRequestService],
  exports: [CarSellRequestService],
})
export class CarSellRequestModule {}
