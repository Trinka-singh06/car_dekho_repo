import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { MakeModule } from './make/make.module';
import { ModelModule } from './model/model.module';
import { VariantModule } from './variant/variant.module';
import { MenuHeadingModule } from './menu_heading/menu_heading.module';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { OTP } from './auth/otp.entity';
import { User } from './auth/user.entity';
import { Make } from './make/entities/make.entity';
import { Variant } from './variant/entities/variant.entity';
import { Category } from './category/entities/category.entity';
import { Car } from './car/entities/car.entity';
import { MenuHeading } from './menu_heading/entities/menu_heading.entity';
import { Model } from './model/entities/model.entity';
import { CarType } from './car/entities/cartype.entity';
import { City } from './car/entities/city.entity';
import { UsedCarDetailsModule } from './used_car_details/used_car_details.module';
import { SellerModule } from './seller/seller.module';
import { UsedCarDetail } from './used_car_details/entities/used_car_detail.entity';
import { Seller } from './seller/entities/seller.entity';
import { CarSellRequestModule } from './car-sell-request/car-sell-request.module';
import { CarSellRequest } from './car-sell-request/entities/car-sell-request.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'car_dekho_app_db',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities:[User, OTP, Make, Model, Variant, Category, Car, MenuHeading, CarType, City, UsedCarDetail, Seller, CarSellRequest],
      synchronize: true,
    }),
    CategoryModule,
    MakeModule,
    ModelModule,
    VariantModule,
    MenuHeadingModule,
    CarModule,
    AuthModule,
    UsedCarDetailsModule,
    SellerModule,
    CarSellRequestModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
