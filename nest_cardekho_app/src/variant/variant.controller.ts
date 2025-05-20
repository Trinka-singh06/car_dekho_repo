import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query, BadRequestException, Res } from '@nestjs/common';
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express'; // ✅ Make sure this import is at the top of your file

@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) { }
  @Post()
  @UseInterceptors(FileInterceptor('images', {
    storage: diskStorage({
      destination: './uploads', // Directory where files will be saved
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, uniqueSuffix + '-' + file.originalname);
      },
    }),
  }))
  async create(
    @Body() createVariantDto: CreateVariantDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.variantService.create(createVariantDto, file);
  }

  @Get()
  findAll() {
    return this.variantService.findAll();
  }



  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVariantDto: UpdateVariantDto) {
    return this.variantService.update(id, updateVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantService.remove(+id);
  }
  
  @Get('price-filter')
  async findByPrice(
    @Query('min') min: string,
    @Query('max') max: string,
  ) {
    const minPrice = Number(min);
    const maxPrice = Number(max);
    console.log(`Controller received: min=${min}, max=${max}`);
    console.log(`Converted to: minPrice=${minPrice}, maxPrice=${maxPrice}`);
    
    return this.variantService.findByPriceRange(minPrice, maxPrice);
  }
  
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.variantService.findOne(id);
  }


  @Get('body-type/:type')
  findByBodyType(@Param('type') type: string) {
    return this.variantService.findByBodyType(type);
  }


  @Get(':id/image')
async getVariantImage(@Param('id') id: number, @Res() res: Response) {
  const variant = await this.variantService.findOne(id);
  const imageData = variant.images; // Assuming buffer or base64

  if (!imageData) {
    return res.status(404).send('Image not found');
  }

  res.set({
    'Content-Type': 'image/jpeg', // adjust accordingly
    'Content-Disposition': 'inline',
  });

  res.send(imageData); // or Buffer.from(imageData, 'base64')
}

  @Get('make/:id')
  findByMake(@Param('id') id: string) {
    return this.variantService.findByMake(Number(id));
  }

  @Get('fuel-type/:type')
  findByFuelType(@Param('type') type: string) {
    return this.variantService.findByFuelType(type);
  }

  @Get('seating/:capacity')
  findBySeatingCapacity(@Param('capacity') capacity: string) {
    return this.variantService.findBySeatingCapacity(+capacity);
  }

  @Get('status/:status')
  findByLaunchStatus(@Param('status') status: string) {
    return this.variantService.findByLaunchStatus(status);
  }



  @Patch(':id/image')
@UseInterceptors(FileInterceptor('images', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
}))
async updateImage(
  @Param('id') id: number,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.variantService.updateImage(id, file);
}



}
