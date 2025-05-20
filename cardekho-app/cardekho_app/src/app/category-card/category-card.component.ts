import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule, TabAllModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';
import { Car } from '../models/category.model';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TabModule, TabAllModule, FormsModule, ButtonModule,
    CarouselModule],
  providers: [CategoryService],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',

})
export class CategoryCardComponent implements OnInit, OnChanges {
  @Input() category!: string;
  @Input() visible: boolean = false;
  // Tab indices
  selectedPriceTabIndex: number = 0;
  selectedBodyTabIndex: number = 0;
  selectedBrandTabIndex: number = 0;  // New property for brand tabs

  carsByPrice: { [key: string]: Car[] } = {};
  carsByBodyType: { [key: string]: Car[] } = {};
  carsByBrand: { [key: string]: Car[] } = {};

  currentPriceCarouselIndex: number = 0;
  currentBodyTypeCarouselIndex: number = 0;
  // Number of cars to display per view
  carsPerView: number = 4;

  makes: any[] = [];  // To store all car brands/makes
  selectedMake: any = null;  // To store the currently selected make
  variantsByMake: Car[] = [];  // To store variants of the selected make

  imageBaseUrl = 'http://localhost:3000/uploads/';

  // Setting selected index property

  priceRanges = [
    { label: '1 - 5 Lakh', min: 100000, max: 500000 },
    { label: '5 - 10 Lakh', min: 500000, max: 1000000 },
    { label: '10 - 15 Lakh', min: 1000000, max: 1500000 },
    { label: '15 - 20 Lakh', min: 1500000, max: 2000000 },
    { label: '20 - 35 Lakh', min: 2000000, max: 3500000 },
    { label: '35 - 50 Lakh', min: 3500000, max: 5000000 },
    { label: '50 Lakh - 1 Crore', min: 5000000, max: 10000000 },
    { label: 'Above 1 Crore', min: 10000000, max: 1000000000 },
  ];

  bodyTypes = ['SUV', 'Hatchback', 'Sedan', 'MUV', 'Luxury'];

  constructor(public categoryService: CategoryService) { }

  ngOnInit() {
    if (this.visible) {
      this.loadData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && this.visible ||
      changes['category'] && this.category) {
      this.loadData();
    }
  }

  // Reset carousel indices when changing tabs
  onTabChange(type: 'price' | 'bodyType', index: number): void {
    if (type === 'price') {
      this.selectedPriceTabIndex = index;
      this.currentPriceCarouselIndex = 0;
    } else {
      this.selectedBodyTabIndex = index;
      this.currentBodyTypeCarouselIndex = 0;
    }
  }

  // Navigation for carousel
  navigateCarousel(type: 'price' | 'bodyType', direction: number): void {
    if (type === 'price') {
      const newIndex = this.currentPriceCarouselIndex + (direction * this.carsPerView);
      const maxIndex = this.getCurrentPriceRangeCars().length - this.carsPerView;

      if (newIndex >= 0 && newIndex <= maxIndex) {
        this.currentPriceCarouselIndex = newIndex;
      } else if (newIndex < 0) {
        this.currentPriceCarouselIndex = 0;
      } else if (newIndex > maxIndex && maxIndex >= 0) {
        this.currentPriceCarouselIndex = maxIndex;
      }
    } else {
      const newIndex = this.currentBodyTypeCarouselIndex + (direction * this.carsPerView);
      const maxIndex = this.getCurrentBodyTypeCars().length - this.carsPerView;

      if (newIndex >= 0 && newIndex <= maxIndex) {
        this.currentBodyTypeCarouselIndex = newIndex;
      } else if (newIndex < 0) {
        this.currentBodyTypeCarouselIndex = 0;
      } else if (newIndex > maxIndex && maxIndex >= 0) {
        this.currentBodyTypeCarouselIndex = maxIndex;
      }
    }
  }

  // Check if next button should be disabled
  isNextDisabled(type: 'price' | 'bodyType'): boolean {
    if (type === 'price') {
      const cars = this.getCurrentPriceRangeCars();
      return !cars || cars.length <= this.carsPerView ||
        this.currentPriceCarouselIndex >= cars.length - this.carsPerView;
    } else {
      const cars = this.getCurrentBodyTypeCars();
      return !cars || cars.length <= this.carsPerView ||
        this.currentBodyTypeCarouselIndex >= cars.length - this.carsPerView;
    }
  }

  // Get currently visible cars for carousel
  getVisibleCars(cars: Car[] | undefined): Car[] {
    if (!cars) return [];

    const type = cars === this.getCurrentPriceRangeCars() ? 'price' : 'bodyType';
    const startIndex = type === 'price' ? this.currentPriceCarouselIndex : this.currentBodyTypeCarouselIndex;

    return cars.slice(startIndex, startIndex + this.carsPerView);
  }

  // Helper methods to get current cars based on selected tab
  getCurrentPriceRangeCars(): Car[] {
    const range = this.priceRanges[this.selectedPriceTabIndex];
    return this.carsByPrice[range.label] || [];
  }

  getCurrentBodyTypeCars(): Car[] {
    const type = this.bodyTypes[this.selectedBodyTabIndex];
    return this.carsByBodyType[type] || [];
  }
  loadData() {
    this.loadCarsByBodyTypes();
    this.loadCarsByPriceRanges();
    this.loadAllMakes();
  }
  // New method to load all car makes/brands
  loadAllMakes(): void {
    this.categoryService.getAllMakes()
      .subscribe(makes => {
        console.log("All car brands loaded:", makes);
        this.makes = makes;
      });
  }

  // New method to handle brand logo click
  onMakeClick(make: any): void {
    this.selectedMake = make;
    console.log("Logo path:", this.categoryService.getMakeLogoUrl(make.makeId));
    this.loadVariantsByMake(make.makeId);
  }


  // New method to load variants by make ID
  loadVariantsByMake(makeId: number): void {
    this.categoryService.getVariantsByMake(makeId)
      .subscribe(variants => {
        console.log(`Variants for make ID ${makeId}:`, variants);
        this.variantsByMake = variants;
      });
  }

  loadCarsByBodyTypes(): void {
    this.bodyTypes.forEach(type => {
      this.categoryService.getCarsByBodyType(type)
        .subscribe(cars => {
          console.log("Explore new car by body types", cars);
          this.carsByBodyType[type] = cars;
        });
    });
  }

  loadCarsByPriceRanges(): void {
    this.priceRanges.forEach(range => {
      this.categoryService.getCarsByPriceRange(range.min, range.max)
        .subscribe(cars => {
          console.log("Explore new cars by price", cars);
          this.carsByPrice[range.label] = cars;
        });
    });
  }

  formatPrice(price: string): string {
    const priceValue = parseFloat(price);

    if (priceValue >= 10000000) {
      // Convert to crore (1 crore = 10,000,000)
      return (priceValue / 10000000).toFixed(2) + ' Cr';
    } else if (priceValue >= 100000) {
      // Convert to lakh (1 lakh = 100,000)
      return (priceValue / 100000).toFixed(2) + ' Lakh';
    } else {
      // Format as regular number with commas
      return priceValue.toLocaleString('en-IN');
    }
  }
}

