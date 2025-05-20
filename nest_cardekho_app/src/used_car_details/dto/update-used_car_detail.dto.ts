import { PartialType } from '@nestjs/mapped-types';
import { CreateUsedCarDetailDto } from './create-used_car_detail.dto';

export class UpdateUsedCarDetailDto extends PartialType(CreateUsedCarDetailDto) {
    name: string;
    title: string;
    images: string;
    carNumber: string;
    price: string;
    lenght: string;
    state: string;
    city: string;
    fuelType: string;
    body_type: string;
    registrationYear: string;
    insurance: string;
    seats: number;
    kmsDriven: string;
    Rto: string;
    ownership: string;
    engine: string;
    mileage: string;
    power: string;
    numberofAirbags: number;
    engineDisplacement: string;
    transmission: string;
    yearofManufacture: number;
    categoryId: number;
    sellerId: number;
    makeId:number;
}
