import { Module } from '@nestjs/common';
import { MakeService } from './make.service';
import { MakeController } from './make.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Make } from './entities/make.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Make])],
  controllers: [MakeController],
  providers: [MakeService],
})
export class MakeModule {}
