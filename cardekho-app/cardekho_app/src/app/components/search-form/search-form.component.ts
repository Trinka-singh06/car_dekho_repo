import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CardService } from '../../services/card.service';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [DropDownListModule, FormsModule, CommonModule, HttpClientModule, GridModule],
  providers: [CardService],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent implements OnInit {
  @Output() searchClicked = new EventEmitter<any>();
  @Output() searchEvent = new EventEmitter<any>();

  allMakes: any[] = [];
  isUsedCar: boolean = false;
  searchType: 'budget' | 'brand' = 'budget';
  // Dropdown data
  budgetRanges: string[] = [];
  cities: any[] = [];
  brands: any[] = [];
  models: any[] = [];
  carTypes: any[] = [];

  // Cities loading state
  citiesLoading: boolean = false;

  // Selected values
  selectedBudget: string = '';
  selectedCity: string = '';
  selectedBrand: string = '';
  selectedModel: string = '';
  selectedCarType: string = '';
  carsByPrice: any = {};
  carsByBodyType: any = {};
  allModels: any[] = [];
  modelsLoading: boolean = false;

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


  // Result
  searchResults: any[] = [];
  loading: boolean = false;
  hasSearched: boolean = false;

  constructor(private carService: CardService, private router: Router) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.loadCities();

  }
  // Load dropdown data
  loadInitialData(): void {
    this.carService.getBudgetRanges().subscribe(data => this.budgetRanges = data);

    this.carService.getBrands().subscribe(
      data => {
        console.log('Brands loaded from API:', data);
        this.brands = data;
      },
      error => console.error('Error loading brands:', error)
    );

    this.loadCities();
    // this.carService.getCities().subscribe(data => this.cities = data);
    this.carService.getCarTypes().subscribe(data => this.carTypes = data);
  }


  // Separate method to load cities

  loadCities(query: string = ''): void {
    if (this.citiesLoading) return; // Prevent multiple simultaneous calls

    console.log('Loading cities...');
    this.citiesLoading = true;

    this.carService.getCities(query).subscribe(
      data => {
        console.log('Cities loaded from API:', data);
        this.cities = data;
        this.citiesLoading = false;
      },
      error => {
        console.error('Error loading cities:', error);
        this.citiesLoading = false;
      }
    );
  }

  // Add this method to handle city search and reload cities when needed
  onCitySelectFocus(): void {
    console.log('City dropdown focused');
    // Check if cities haven't been loaded yet or if the array is empty
    if (this.cities.length === 0) {
      this.loadCities();
    }
  }
  onCitySelectClicked(): void {
    // This method will be called when the city dropdown is clicked
    this.onCitySelectFocus();
  }

  onNewCar(): void {
    this.isUsedCar = false;
    this.clearForm();
  }

  onUsedCar(): void {
    this.isUsedCar = true;
    this.clearForm();
    // Make sure cities are loaded when switching to Used Car
    this.loadCities();


    // Load all models for used cars
    this.carService.getAllUsedCarModels().subscribe(
      data => {
        console.log('Used car models:', data);
        this.allModels = data;
      },
      error => {
        console.error('Error loading models for used car:', error);
      }
    );
  }

  onSearchTypeChange(type: 'budget' | 'brand') {
    this.searchType = type;
    this.clearForm();

    // If switching to a type that needs cities, make sure they're loaded
    if (this.isUsedCar) {
      this.loadCities();
    }
  }

  onBudgetChange(): void {
    // When budget changes, get car types available for that budget range (for new cars only)
    if (!this.isUsedCar && this.selectedBudget) {
      this.carService.getCarTypesByBudget(this.selectedBudget)
        .subscribe(types => this.carTypes = types);
    }
    // If this is a used car search, ensure cities are loaded
    if (this.isUsedCar && this.cities.length === 0) {
      this.loadCities();
    }
  }

  onBrandChange(): void {
    console.log('Brand changed to:', this.selectedBrand);

    if (this.selectedBrand) {
      // Find the brand object by name
      const selected = this.brands.find(b => b.name === this.selectedBrand);
      console.log('Found brand object:', selected);

      if (selected) {
        // Get the ID to use (could be id or makeId depending on your API)
        const brandId = selected.id || selected.makeId;
        console.log('Using brand ID:', brandId);

        if (brandId) {
          this.carService.getModels(brandId).subscribe(
            data => {
              console.log('API returned models:', data);
              this.models = data;
            },
            error => {
              console.error('API error loading models:', error);
              this.models = [];
            }
          );
        } else {
          console.error('Brand object has no ID:', selected);
          this.models = [];
        }
      } else {
        console.error('Could not find brand with name:', this.selectedBrand);
        this.models = [];
      }
    } else {
      // Reset models if no brand is selected
      this.models = [];

    }
    // If this is a used car search, ensure cities are loaded
    if (this.isUsedCar && this.cities.length === 0) {
      this.loadCities();
    }
  }

  search(): void {
    if (!this.validateForm()) {
      console.warn('Form validation failed');
      return;
    }

    console.log('Searching with filters:', {
      isUsedCar: this.isUsedCar,
      searchType: this.searchType,
      selectedBudget: this.selectedBudget,
      selectedBrand: this.selectedBrand,
      selectedModel: this.selectedModel,
      selectedCity: this.selectedCity,
      selectedCarType: this.selectedCarType
    });

    const filters = {
      isUsedCar: this.isUsedCar,
      searchType: this.searchType,
      selectedBudget: this.selectedBudget,
      selectedBrand: this.selectedBrand,
      selectedModel: this.selectedModel,
      selectedCity: this.selectedCity,
      selectedCarType: this.selectedCarType
    };

    this.router.navigate(['/results'], { state: { filters } });
  }

  validateForm(): boolean {
    // Check for new car with budget option
    if (!this.isUsedCar && this.searchType === 'budget') {
      return !!this.selectedBudget && !!this.selectedCarType;
    }

    // Check for new car with brand option
    if (!this.isUsedCar && this.searchType === 'brand') {
      return !!this.selectedBrand && !!this.selectedModel;
    }

    // Check for used car with budget option
    if (this.isUsedCar && this.searchType === 'budget') {
      return !!this.selectedBudget && !!this.selectedCity;
    }

    // Check for used car with brand option
    if (this.isUsedCar && this.searchType === 'brand') {
      return !!this.selectedModel && !!this.selectedCity;
    }

    return false;
  }

  clearForm(): void {
    this.selectedBudget = '';
    this.selectedCity = '';
    this.selectedBrand = '';
    this.selectedModel = '';
    this.selectedCarType = '';
    this.models = [];
    this.searchResults = [];
    this.models = [];
    this.hasSearched = false;
  }

}

