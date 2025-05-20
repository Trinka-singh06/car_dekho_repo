import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { User } from 'src/auth/user.entity';

@Module({
   imports:[TypeOrmModule.forFeature([Seller, User])],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
