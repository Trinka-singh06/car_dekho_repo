import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { MakeService } from './make.service';
import { CreateMakeDto } from './dto/create-make.dto';
import { UpdateMakeDto } from './dto/update-make.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express'; // ✅ Make sure this import is at the top of your file
@Controller('make')
export class MakeController {

  constructor(private readonly makeService: MakeService) {}

  @Post()
  create(@Body() createMakeDto: CreateMakeDto) {
    return this.makeService.create(createMakeDto);
  }

  // PATCH only the logo
  @Patch('logo/:id')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/make-logos',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `logo-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async updateLogo(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.makeService.update(id, { logo: file.filename });
  }
  @Get()
  findAll() {
    return this.makeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.makeService.findOne(id);
  }
  
 

  @Get('logo/:id')
  async getLogo(@Param('id') id: number, @Res() res: Response) {
    const make = await this.makeService.findOne(id);
    const logoFilename = make.logo;
  
    if (!logoFilename) {
      return res.status(404).send('Logo not found');
    }
  
    const logoPath = `./uploads/make-logos/${logoFilename}`;
    const fs = require('fs');
  
    if (!fs.existsSync(logoPath)) {
      return res.status(404).send('Logo file not found on server');
    }
  
    res.sendFile(logoPath, { root: './' }); // ✅ This will send the image as a response
  }
  
  

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMakeDto: UpdateMakeDto) {
    return this.makeService.update(id, updateMakeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.makeService.remove(id);
  }
}
