// src/app/models/car-sell-request.model.ts
export interface CarSellRequest {
    requestId?: number;
    status: string;
    comments?: string;
    requestDate: Date;
    inspectionDate?: Date;
    valuationAmount?: number;
    carDetail?: any;
    user?: any;
  }
  
  export interface CreateCarSellRequestDto {
    make?: string;
    model?: string;
    year?: number;
    mileage?: number;
    description?: string;
    contactPreference?: string;
  }
  
  export interface CreateUsedCarDetailDto {
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    color: string;
    fuelType: string;
    transmission: string;
    description: string;
    images?: string;
  }
  
  export interface CreateSellerDto {
    name: string;
    mobile: string;
    contactAdderess: string;
    email: string;
  }