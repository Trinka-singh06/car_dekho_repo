import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";

export class CreateCarSellRequestDto {
    @IsString()
    carName: string;
  
    @IsString()
    carModel: string;
  
    @IsString()
    carYear: string;
  
    @IsString()
    fuelType: string;
  
    @IsNumber()
    kmsDriven: number;
  
    @IsString()
    contactNumber: string;
    
    @IsString()
    preferredInspectionDate?: string;
    
    @IsString()
    additionalNotes?: string;
  }
  
  export class UpdateCarSellRequestDto extends PartialType(CreateCarSellRequestDto) {}
