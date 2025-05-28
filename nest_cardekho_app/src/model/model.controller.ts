import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus, BadRequestException, Query } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname, join } from 'path';
import { IsNumberString, IsOptional } from 'class-validator';

// Create a DTO for query validation
class PaginationQueryDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) { }

  @Get()
  async getUsers(@Query() query: PaginationQueryDto) {
    return this.modelService.getPaginatedUsers(query);
  }

  @Get('filter')
  filterNewCars(
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
    @Query('body_type') bodyType: string,
  ) {
    return this.modelService.filterByBudgetAndBody(minPrice, maxPrice, bodyType);
  }


  // Add new filter endpoints
  @Get('filter/by-price-range')
  findByPriceRange(
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
  ) {
    return this.modelService.findByPriceRange(minPrice, maxPrice);
  }

  @Get('filter/by-body-type')
  findByBodyType(@Query('bodyType') bodyType: string) {
    return this.modelService.findByBodyType(bodyType);
  }

  @Get('filter/by-price-and-body')
  findByPriceAndBodyType(
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
    @Query('bodyType') bodyType: string,
  ) {
    return this.modelService.findByPriceRangeAndBodyType(minPrice, maxPrice, bodyType);
  }

  @Get('filter/by-make')
  findByMake(@Query('makeId') makeId: number) {
    return this.modelService.findByMake(makeId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('images', {
      storage: diskStorage({
        destination: './uploads/models',
        filename: (req, file, cb) => {
          // Generate a unique filename
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          cb(null, `model-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Check file type
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )

  async create(
    @Body() createModelDto: CreateModelDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.modelService.create(createModelDto, image);
  }

  @Get()
  findAll() {
    return this.modelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelService.findOne(+id);
  }

  @Get('fuel/:type')
  findByFuelType(@Param('type') type: string) {
    return this.modelService.findByFuelType(type);
  }

  @Get('filter/by-make-and-model')
  findByMakeAndModel(
    @Query('makeId') makeId: number,
    @Query('modelName') modelName: string,
  ) {
    return this.modelService.findByMakeAndModel(makeId, modelName);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('images', {
      storage: diskStorage({
        destination: './uploads/models',
        filename: (_, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          cb(null, `model-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )

  update(
    @Param('id') id: number,
    @Body() updateModelDto: UpdateModelDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.modelService.update(id, updateModelDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.modelService.remove(id);
  }

}

