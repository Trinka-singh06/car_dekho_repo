import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { Make } from 'src/make/entities/make.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ Model, Make])],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
