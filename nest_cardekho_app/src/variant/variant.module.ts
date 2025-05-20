import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import { Model } from 'src/model/entities/model.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Variant, Model])],
  controllers: [VariantController],
  providers: [VariantService],
})
export class VariantModule {}
