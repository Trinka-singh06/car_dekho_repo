import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarSellRequestDto } from './dto/create-car-sell-request.dto';
import { UpdateCarSellRequestDto } from './dto/update-car-sell-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarSellRequest } from './entities/car-sell-request.entity';
import { UsedCarDetail } from 'src/used_car_details/entities/used_car_detail.entity';
import { User } from 'src/auth/user.entity';
import { Seller } from 'src/seller/entities/seller.entity';
import { CreateUsedCarDetailDto } from 'src/used_car_details/dto/create-used_car_detail.dto';
import { CreateSellerDto } from 'src/seller/dto/create-seller.dto';
@Injectable()
export class CarSellRequestService {
  constructor(
    @InjectRepository(CarSellRequest) 
    private requestRepo: Repository<CarSellRequest>,
    @InjectRepository(User) 
    private userRepo: Repository<User>,
    @InjectRepository(UsedCarDetail) 
    private carRepo: Repository<UsedCarDetail>,
    @InjectRepository(Seller) 
    private sellerRepo: Repository<Seller>,
  ) {}

  async create(userId: number, carDetails: CreateCarSellRequestDto): Promise<CarSellRequest> {
    const user = await this.userRepo.findOneBy({ id: userId });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create a new sell request
    const sellRequest = new CarSellRequest();
    sellRequest.user = user;
    sellRequest.status = 'pending';
    sellRequest.requestDate = new Date();
    
    // Save preliminary car details
    const savedRequest = await this.requestRepo.save(sellRequest);
    
    return savedRequest;
  }

  async updateStatus(requestId: number, status: string, comments?: string): Promise<CarSellRequest> {
    const request = await this.requestRepo.findOne({
      where: { requestId },
      relations: ['user', 'carDetail'],
    });

    if (!request) {
      throw new NotFoundException('Sell request not found');
    }

    request.status = status;
    if (comments) {
      request.comments = comments;
    }

    return this.requestRepo.save(request);
  }

  async scheduleInspection(requestId: number, inspectionDate: Date): Promise<CarSellRequest> {
    const request = await this.requestRepo.findOne({
      where: { requestId },
      relations: ['user'],
    });

    if (!request) {
      throw new NotFoundException('Sell request not found');
    }

    request.inspectionDate = inspectionDate;
    return this.requestRepo.save(request);
  }

  async setValuation(requestId: number, valuationAmount: number): Promise<CarSellRequest> {
    const request = await this.requestRepo.findOne({
      where: { requestId },
      relations: ['user'],
    });

    if (!request) {
      throw new NotFoundException('Sell request not found');
    }

    request.valuationAmount = valuationAmount;
    return this.requestRepo.save(request);
  }

  async approveAndCreateListing(
    requestId: number, 
    carDetails: CreateUsedCarDetailDto,
    sellerDetails: CreateSellerDto,
  ): Promise<UsedCarDetail> {
    // Get the request
    const request = await this.requestRepo.findOne({
      where: { requestId },
      relations: ['user'],
    });

    if (!request) {
      throw new NotFoundException('Sell request not found');
    }

    // Create or find seller
    let seller = await this.sellerRepo.findOne({
      where: { email: sellerDetails.email }
    });

    if (!seller) {
      seller = this.sellerRepo.create(sellerDetails);
      seller = await this.sellerRepo.save(seller);
    }

    // Create car listing
    const car = this.carRepo.create({
      ...carDetails,
      seller,
    });

    const savedCar = await this.carRepo.save(car);

    // Update request status and link to car
    request.status = 'listed';
    request.carDetail = savedCar;
    await this.requestRepo.save(request);

    return savedCar;
  }

  async findRequestsByUser(userId: number): Promise<CarSellRequest[]> {
    return this.requestRepo.find({
      where: { user: { id: userId } },
      relations: ['carDetail'],
      order: { requestDate: 'DESC' },
    });
  }

  async findAll(): Promise<CarSellRequest[]> {
    return this.requestRepo.find({
      relations: ['user', 'carDetail'],
      order: { requestDate: 'DESC' },
    });
  }

  async findOne(requestId: number): Promise<CarSellRequest> {
    const request = await this.requestRepo.findOne({
      where: { requestId },
      relations: ['user', 'carDetail'],
    });

    if (!request) {
      throw new NotFoundException('Sell request not found');
    }

    return request;
  }
}