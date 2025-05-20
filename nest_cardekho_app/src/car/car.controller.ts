import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CarService } from './car.service';

import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('seed-car-types')
  async seedCarTypes() {
    return this.carService.seedCarTypes();
  }

  @Get('new/budget')
  async getNewCarsByBudget(@Query('range') budgetRange: string) {
    return this.carService.findNewCarsByBudget(budgetRange);
  }

  @Get('new/budget/type')
  async getNewCarsByBudgetAndType(
    @Query('range') budgetRange: string,
    @Query('carType') carType: string,
  ) {
    return this.carService.findNewCarsByBudgetAndType(budgetRange, carType);
  }

  @Get('car-types/by-budget')
  async getCarTypesByBudget(@Query('range') budgetRange: string) {
    return this.carService.getCarTypesByBudget(budgetRange);
  }

  @Get('new/model')
  async getNewCarsByModel(
    @Query('brand') brand: string,
    @Query('model') model: string,
  ) {
    return this.carService.findNewCarsByModel(brand, model);
  }

  // Endpoint for used cars search by budget
  @Get('used/budget')
  async getUsedCarsByBudget(
    @Query('range') budgetRange: string,
    @Query('city') city: string,
  ) {
    return this.carService.findUsedCarsByBudget(budgetRange, city);
  }

  // Endpoint for used cars search by model
  @Get('used/model')
  async getUsedCarsByModel(
    @Query('brand') brand: string,
    @Query('model') model: string,
    @Query('city') city: string,
  ) {
    return this.carService.findUsedCarsByModel(brand, model, city);
  }

  // Get all available budget ranges
  @Get('budget-ranges')
  async getBudgetRanges() {
    return this.carService.getBudgetRanges();
  }

  // Get all available car types
  @Get('car-types')
  async getCarTypes() {
    return this.carService.getCarTypes();
  }

  // Get all available brands
  @Get('brands')
  async getAllBrands() {
    return this.carService.getAllBrands();
  }

  // Get models by brand
  @Get('models/:brandId')
  async getModelsByBrand(@Param('brandId') brandId: number) {
    return this.carService.getModelsByBrand(brandId);
  }

  // Get cities (for used cars)
  @Get('cities')
  async getCities() {
    return this.carService.getCities();
  }
}
