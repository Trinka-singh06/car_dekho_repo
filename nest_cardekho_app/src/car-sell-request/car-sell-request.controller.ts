import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CarSellRequestService } from './car-sell-request.service';
import { CreateCarSellRequestDto } from './dto/create-car-sell-request.dto';
import { UpdateCarSellRequestDto } from './dto/update-car-sell-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateUsedCarDetailDto } from 'src/used_car_details/dto/create-used_car_detail.dto';
import { CreateSellerDto } from 'src/seller/dto/create-seller.dto';
@Controller('car-sell-requests')
export class CarSellRequestController {
  constructor(private readonly carSellRequestService: CarSellRequestService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req, // Changed from @Request() to @Req()
    @Body() createCarSellRequestDto: CreateCarSellRequestDto
  ) {
    return this.carSellRequestService.create(req.user.sub, createCarSellRequestDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findUserRequests(@Req() req) { // Changed from @Request() to @Req()
    return this.carSellRequestService.findRequestsByUser(req.user.sub);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll() {
    return this.carSellRequestService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.carSellRequestService.findOne(+id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, AdminGuard)
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: { status: string; comments?: string }
  ) {
    return this.carSellRequestService.updateStatus(
      +id,
      updateStatusDto.status,
      updateStatusDto.comments
    );
  }

  @Patch(':id/inspection')
  @UseGuards(JwtAuthGuard, AdminGuard)
  scheduleInspection(
    @Param('id') id: string,
    @Body() dto: { inspectionDate: Date }
  ) {
    return this.carSellRequestService.scheduleInspection(+id, dto.inspectionDate);
  }

  @Patch(':id/valuation')
  @UseGuards(JwtAuthGuard, AdminGuard)
  setValuation(
    @Param('id') id: string,
    @Body() dto: { valuationAmount: number }
  ) {
    return this.carSellRequestService.setValuation(+id, dto.valuationAmount);
  }

  @Post(':id/approve')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/car-images',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  approveAndCreateListing(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: {
      carDetails: CreateUsedCarDetailDto;
      sellerDetails: CreateSellerDto;
    }
  ) {
    const imagePath = file?.filename ?? '';
    return this.carSellRequestService.approveAndCreateListing(
      +id,
      {
        ...dto.carDetails,
        images: imagePath,
      },
      dto.sellerDetails
    );
  }
}