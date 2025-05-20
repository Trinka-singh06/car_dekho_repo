import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { UsedCarDetailsService } from './used_car_details.service';
import { CreateUsedCarDetailDto } from './dto/create-used_car_detail.dto';
import { UpdateUsedCarDetailDto } from './dto/update-used_car_detail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('used-car-details')
export class UsedCarDetailsController {
  constructor(private readonly usedCarDetailsService: UsedCarDetailsService) {}

  @Get('filter/by-price-range')
  findByPriceRange(
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
  ) {
    return this.usedCarDetailsService.findByPriceRange(minPrice, maxPrice);
  }

  @Get('filter/by-model')
  findByModel(@Query('modelName') modelName: string) {
    return this.usedCarDetailsService.findByModel(modelName);
  }

  @Get('filter/by-model-and-city')
  findByModelAndCity(
    @Query('modelName') modelName: string,
    @Query('city') city: string,
  ) {
    return this.usedCarDetailsService.findByModelAndCity(modelName, city);
  }

  
  @Get('filter/by-body-type')
  findByBodyType(@Query('bodyType') bodyType: string) {
    return this.usedCarDetailsService.findByBodyType(bodyType);
  }
  
  @Get('filter/by-city/:city')
  findByCity(@Param('city') city:string){
  return this.usedCarDetailsService.findByCity(city);
  }
  // ADD THIS NEW ENDPOINT for cities
  @Get('cities')
  getAllCities(@Query('q') query?: string) {
    return this.usedCarDetailsService.getAllCities(query);
  }

  @Get('models/all')
getAllModels(): Promise<string[]> {
  return this.usedCarDetailsService.getAllModels();
}


  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', // make sure this folder exists
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUsedCarDetailDto: CreateUsedCarDetailDto,
  ) {
    const imagePath = file?.filename ?? '';
    return this.usedCarDetailsService.create({
      ...createUsedCarDetailDto,
      images: imagePath,
    });
  }


  @Get()
  findAll() {
    return this.usedCarDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usedCarDetailsService.findOne(id);
  }

  @Put(':id')
  replace(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateUsedCarDetailDto) {
    return this.usedCarDetailsService.update(id, dto);
  }
  
  @Patch(':id')
  partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUsedCarDetailDto) {
    return this.usedCarDetailsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usedCarDetailsService.remove(+id);
  }
}
