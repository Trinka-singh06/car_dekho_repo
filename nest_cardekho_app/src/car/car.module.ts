import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Make } from 'src/make/entities/make.entity';
import { Model } from 'src/model/entities/model.entity';
import { Variant } from 'src/variant/entities/variant.entity';
import { City } from './entities/city.entity';
import { CarType } from './entities/cartype.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, Make, Model, Variant, City,CarType]),
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
