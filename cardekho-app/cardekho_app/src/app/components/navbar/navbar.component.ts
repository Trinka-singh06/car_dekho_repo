import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ContextMenuModule, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { CategoryService } from '../../services/category.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
// import { CarModel, CarVariant, Category, Menu, } from '../../models/category.model';
import { CategoryCardComponent } from "../../category-card/category-card.component";
import { AuthService } from '../../services/auth.service';
import { UserMenuComponent } from "../user-menu/user-menu.component";
import { LoginRegisterComponent } from "../login-register/login-register.component";
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { catchError, combineLatest, map, Observable, of } from 'rxjs';
// Define interfaces to match your API structure
interface Menu {
  menuId: number;
  name: string;
  category: Category[];
}

interface Category {
  categoryId: number;
  name: string;
  hasSubCategory: boolean;
  makes: Make[];
  cars: Car[];
}

interface Make {
  makeId: number;
  name: string;
  logo: string;
  models: Model[];
}

interface Model {
  modelId: number;
  name: string;
  price: string;
  variants: Variant[];
  // other model properties
}

interface Car {
  carId: number;
  name: string;
  title: string;
  // other car properties
}

interface Variant {
  id: number;
  name: string;
  // other variant properties
}
interface SelectionChangedEvent {
  menu?: string;
  category?: string;
  exploreCars?: boolean;
  usedCars?: any[];
  make?: string;
  model?: string;
  modelData?: any;
  variants?: any[];
  variant?: string;
  variantData?: any;
  car?: any;
}
interface SearchSuggestion {
  id?: number;
  name: string;
  type: string; // 'New Car', 'Used Car', etc.
  details?: any;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, DropDownButtonModule, RouterModule, FormsModule, RouterOutlet, DropDownListModule, ContextMenuModule, MenuModule, HttpClientModule, RouterLinkActive, CategoryCardComponent, UserMenuComponent, LoginRegisterComponent, DropDownListModule],
  providers: [CategoryService, AuthService, CardService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class NavbarComponent implements OnInit {
  @Output() selectionChanged = new EventEmitter<{
    model?: string | null;
    category?: string | null;
    exploreCars?: boolean;
    usedCars?: any[]; // 👈 Add this line
    city?: string;
  }>();

  searchSuggestions: SearchSuggestion[] = [];
  isSearching: boolean = false;
  minCharsForSuggestions: number = 2;
  selectedLanguage = 'English';
  showVariants = false;
  searchModel = '';
  searchCity: string | null = null;    // if you also want to filter by city
  usedCarsResults: any[] = [];
  newCarsResults: any[] = [];
  // Model detail properties
  modelImage: string = '';
  modelPrice: string = '';
  modelEngine: string = '';
  modelPower: string = '';
  modelTransmission: string = '';
  modelTorque: string = '';
  modelMileage: string = '';
  modelFuelType: string = '';
  modelDetails: any = null;
  isLoggedIn: boolean = false;
  userName: string = '';
  showLoginModal: boolean = false;
  languages: { id: string, text: string }[] = [
    { id: 'en', text: 'English' },
    { id: 'hi', text: 'Hindi' }
  ];

  // showHome: boolean = true;
  currentMenuData: any = null;
  selectedMake: string | null = null;
  selectedVariant: string | null = null;
  selectedCar: any | null = null;
  // Component class properties
  selectedMenu: string | null = null;
  // selectedCategory: string | null = null;

  // Update these properties
  searchQuery: string = '';
  selectedCity: string | null = null;
  cityList: string[] = []; // Will be populated from API
  showCityDropdown: boolean = false;
  isAdmin = true; // your admin logic
  currentMakeModels: any[] = [];
  currentModelVariants: any[] = [];
  currentVariantData: any = null;
  showExplorer: boolean = false;
  searchText: string = '';
  showExploreSection: boolean = true;
  selectedFilter: string = 'All';
  dropdownOpen: boolean = false;
  allMakes: any[] = [];
  carsByPrice: any = {};
  carsByBodyType: any = {};
  selectedModel: string | null = null;
  selectedCategory: string | null = null;
  showHome: boolean = true;
  imageBaseUrl = 'http://localhost:3000/uploads/';
  menuItems: any[] = [];
  usedCarList: any[] = [];
  carVariantsData: { [modelName: string]: any[] } = {}; // model -> variants
  categoryCarsData: { [categoryName: string]: any[] } = {}; // category -> cars

  constructor(private categoryService: CategoryService, private router: Router, private authService: AuthService, private http: HttpClient, private cardService: CardService) { }

  ngOnInit() {
    this.loadMenuHeadings();
    this.checkLoginStatus();
    this.loadAllMakes();
    this.preloadCarData();

    // Subscribe to auth state changes
    this.authService.authStateChanged.subscribe(() => {
      this.checkLoginStatus();
    });
  }

  loadCities() {
    this.categoryService.getCategoryData()
      .subscribe(cars => {
        console.log("cars-details", cars);
        // Extract unique cities from car data
        const cities = [...new Set(cars.map(car => car.city))].filter(city => !!city);
        this.cityList = cities;
      });
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.authService.getCurrentUser();
      this.userName = user?.name || 'User';
    }
  }

  openLoginModal(): void {
    this.showLoginModal = true;
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
  }

  onLoginSuccess(): void {
    this.checkLoginStatus();
  }

  onLanguageChange(event: any): void {
    this.selectedLanguage = event.value;
    // Implement language change logic
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.dropdownOpen = false;
  }

  goToHome() {
    this.selectedModel = null;
    this.selectedCategory = null;
    this.selectedCity = null;
    this.usedCarList = [];
    this.showExploreSection = false;
    this.router.navigate(['/']);
    this.selectionChanged.emit({});
  }

  toggleVariants() {
    this.showVariants = !this.showVariants;
  }

  loadMenuHeadings() {
    this.categoryService.getAllMenus().subscribe((menus) => {
      this.menuItems = menus.map(menu => ({
        menuId: menu.menuId,
        text: menu.name,
        items: menu.category.map(cat => ({
          text: cat.name,
          action: cat.name,
          menuId: menu.menuId,
          items: [] // we'll fill this in next step
        }))
      }));

      // Load subcategories for menu id 1 as an example
      this.categoryService.getMenuById(1).subscribe(data => {
        this.populateSubcategories(data);
      });

      // Load cities and assign them as sub-items
      this.categoryService.getCategoryData().subscribe(cars => {
        const cities = [...new Set(cars.map(car => car.city))].filter(city => !!city);
        this.cityList = cities;

        // Add city subcategories under "Used Cars In Your City"
        this.menuItems.forEach(menu => {
          const usedCarCategory = menu.items?.find(i => i.text === "Used Cars In Your City");
          if (usedCarCategory) {
            usedCarCategory.items = cities.map(city => ({
              text: city,
              action: city
            }));
          }
        });

        console.log("Updated Menu Items with Cities:", this.menuItems);
      });

    });

  }

  populateSubcategories(data: any) {
    data.category.forEach((cat: any) => {
      const categoryName = cat.name;
      const models: any[] = [];

      cat.makes?.forEach(make => {
        make.models?.forEach(model => {
          const modelName = model.name;
          const modelData = {
            name: modelName,
            image: this.imageBaseUrl + (model.images?.replace('uploads/', '') || ''),
            price: model.price,
            engine: model.engine,
            power: model.power,
            transmission: model.transmission,
            torque: model.torgue,
            mileage: model.mileage,
            fueltype: model.fueltype
          };

          // Store model data for quick access
          this.modelDetails = this.modelDetails || {};
          this.modelDetails[modelName] = modelData;

          model.variants?.forEach(variant => {
            const image = this.imageBaseUrl + variant.images;

            // Add variant to model
            this.carVariantsData[modelName] = this.carVariantsData[modelName] || [];
            this.carVariantsData[modelName].push({
              name: variant.name,
              image,
              price: variant.price,
              engine: variant.engine,
              power: variant.power,
              transmission: variant.transmission,
              mileage: variant.mileage,
              fueltype: variant.fueltype
            });

            // Add model to category
            models.push(modelData);
          });
        });
      });

      this.categoryCarsData[categoryName] = models;

      const categoryItem = this.menuItems
        .find(menu => menu.items?.some(i => i.text === categoryName))
        ?.items?.find(i => i.text === categoryName);

      if (categoryItem) {
        categoryItem.items = cat.makes?.flatMap(make =>
          make.models?.map(model => ({ text: model.name, action: model.name })) || []
        );
      }
    });
  }

  onModelSelect(action: string | undefined) {
    if (!action) return;

    if (action === 'Sell My Car') {
      this.router.navigate(['/sell-car-form']);
      this.showHome = false;
      this.showExploreSection = false;
      this.selectionChanged.emit({
        model: null,
        category: null,
        exploreCars: false,
        usedCars: []
      });
      return;
    }
    // First check your original handlers that were already working
    if (this.carVariantsData[action]) {
      this.selectedModel = this.selectedModel === action ? null : action;
      this.selectedCategory = null;
      this.showHome = false;
      this.showExploreSection = false;
      this.showCityDropdown = false;
      this.showVariants = false; // Reset variants view
      this.selectionChanged.emit({ model: this.selectedModel });

      // Set model details
      if (this.modelDetails && this.modelDetails[action]) {
        const modelInfo = this.modelDetails[action];
        this.modelImage = modelInfo.image;
        this.modelPrice = modelInfo.price;
        this.modelEngine = modelInfo.engine;
        this.modelPower = modelInfo.power;
        this.modelTransmission = modelInfo.transmission;
        this.modelTorque = modelInfo.torque;
        this.modelMileage = modelInfo.mileage;
        this.modelFuelType = modelInfo.fueltype;
      }

      this.selectionChanged.emit({ model: this.selectedModel });
      return;
    }
    else if (this.categoryCarsData[action]) {
      this.selectedCategory = this.selectedCategory === action ? null : action;
      this.selectedModel = null;
      this.showHome = false;
      this.showCityDropdown = false;

      if (action === "Explore New Cars") {
        this.showExploreSection = true;
        this.selectionChanged.emit({ category: this.selectedCategory, exploreCars: true });
      }
      // Handle "Used Cars In Your City" specially to show city dropdown
      else if (action === "Used Cars In Your City") {
        this.showExploreSection = false;
        this.showCityDropdown = true;
        this.selectionChanged.emit({ category: this.selectedCategory });
      }
      else {
        this.showExploreSection = false;
        this.selectionChanged.emit({ category: this.selectedCategory });
      }
      return;
    }
    if (this.cityList.includes(action)) {
      console.log("City Selected:", action); // <-- ADD THIS LINE

      this.selectedCity = action;
      this.showCityDropdown = true;

      this.categoryService.getUsedCarsByCity(action)
        .subscribe(data => {
          console.log("Filtered Cars by City:", data); // <-- ADD THIS LINE
          this.usedCarList = data;
          this.selectionChanged.emit({
            category: this.selectedCategory,
            usedCars: this.usedCarList,
            city: this.selectedCity
          });
        });
      return;
    }

    // Now check for used car categories and handle the API call
    const foundMenu = this.menuItems.find(menu =>
      menu.items?.some(cat => cat.text === action)
    );
    const selectedCategoryItem = foundMenu?.items?.find(cat => cat.text === action);
    const menuId = selectedCategoryItem?.menuId;

    if (menuId) {
      this.categoryService.getMenuById(menuId).subscribe(data => {
        const foundCat = data.category.find((cat: any) => cat.name === action);

        if (foundCat?.cars?.length > 0) {
          this.selectedCategory = action;
          this.selectedModel = null;
          this.showHome = false;
          this.showCityDropdown = false;
          this.usedCarList = foundCat.cars;
          this.selectionChanged.emit({
            usedCars: this.usedCarList,
            category: this.selectedCategory
          });
        }
      });
      return;
    }

    // Check if action is a Make/Brand
    for (const menu of this.menuItems) {
      for (const category of menu.category || []) {
        const make = category.makes?.find(m => m.name === action);
        if (make) {
          this.selectedCategory = category.name;
          this.selectedMake = action;
          this.selectedModel = null;
          this.selectedVariant = null;
          this.showHome = false;

          // Since you don't have a 'make' property in your emitter,
          // we'll store the data in component property
          this.currentMakeModels = make.models;

          // Emit just the category change
          this.selectionChanged.emit({
            category: this.selectedCategory
          });
          return;
        }
      }
    }

    // Check if action is a Model
    for (const menu of this.menuItems) {
      for (const category of menu.category || []) {
        for (const make of category.makes || []) {
          const model = make.models?.find(m => m.name === action);
          if (model) {
            this.selectedCategory = category.name;
            this.selectedMake = make.name;
            this.selectedModel = action;
            this.selectedVariant = null;
            this.showHome = false;
            this.showVariants = false;
            // Store model data for display
            this.modelImage = this.imageBaseUrl + model.images;
            this.modelPrice = model.price;
            this.modelEngine = model.engine;
            this.modelPower = model.power;
            this.modelTransmission = model.transmission;
            this.modelTorque = model.torgue;
            this.modelMileage = model.mileage;
            this.modelFuelType = model.fueltype;
            // Store model data
            this.currentModelVariants = model.variants;

            // Emit model selection
            this.selectionChanged.emit({
              category: this.selectedCategory,
              model: this.selectedModel
            });
            return;
          }
        }
      }
    }

    // Check if action is a Variant
    for (const menu of this.menuItems) {
      for (const category of menu.category || []) {
        for (const make of category.makes || []) {
          for (const model of make.models || []) {
            const variant = model.variants?.find(v => v.name === action);
            if (variant) {
              this.selectedCategory = category.name;
              this.selectedMake = make.name;
              this.selectedModel = model.name;
              this.selectedVariant = action;
              this.showHome = false;

              // Store variant data
              this.currentVariantData = variant;

              // Emit model selection (since variant isn't in your emitter)
              this.selectionChanged.emit({
                category: this.selectedCategory,
                model: this.selectedModel
              });
              return;
            }
          }
        }
      }
    }
  }
  // Method to handle city selection
  onCitySelect(city: string) {
    if (!city) return;

    this.selectedCity = city;

    // Call the API with the selected city
    this.categoryService.getUsedCarsByCity(city)
      .subscribe(data => {
        this.usedCarList = data;
        this.selectionChanged.emit({
          category: this.selectedCategory,
          usedCars: this.usedCarList,
          city: this.selectedCity
        });
      });
  }


  onSelect(event: any) {
    const selectedUrl = event.item.url;
    if (selectedUrl) {
      this.router.navigateByUrl(selectedUrl);
    }

  }


  onSearchQuery() {
    if (!this.searchQuery.trim()) { return; }
    // emit or navigate using this.searchQuery
    console.log('User searched for:', this.searchQuery);
    // e.g. this.searchEvent.emit(this.searchQuery);
  }


  loadAllMakes() {
    this.cardService.getBrands().subscribe(makes => {
      this.allMakes = makes;
    });
  }

  // Preload some car data for faster search
  preloadCarData() {
    // Preload models data
    this.cardService.getAllModels().subscribe(models => {
      // Store models for quick search
    });

    // Preload used car data
    this.categoryService.getCategoryData().subscribe(usedCars => {
      // Store used cars for quick search
    });
  }

  // Triggered when user types in the search box
  onSearchInput() {
    if (this.searchQuery.length < this.minCharsForSuggestions) {
      this.searchSuggestions = [];
      return;
    }

    // Show loading state
    this.isSearching = true;

    // Fetch and combine search suggestions from different sources
    this.getSearchSuggestions().subscribe(suggestions => {
      this.searchSuggestions = suggestions;
      this.isSearching = false;
    });
  }
  // Update the getSearchSuggestions method to properly handle used car search
  getSearchSuggestions(): Observable<SearchSuggestion[]> {
    const query = this.searchQuery.toLowerCase();

    // Only search if query has enough characters
    if (query.length < this.minCharsForSuggestions) {
      return of([]);
    }

    // Search in new cars (models)
    const newCarSuggestions$ = this.cardService.getAllModels().pipe(
      map(models => {
        return models
          .filter(model => model.name.toLowerCase().includes(query))
          .map(model => ({
            id: model.id || model.modelId,
            name: model.name,
            type: 'New Car',
            details: model
          }));
      }),
      catchError(error => {
        console.error('Error fetching new car suggestions:', error);
        return of([]);
      })
    );

    // Search in used cars - FIXED IMPLEMENTATION
    const usedCarSuggestions$ = this.categoryService.getuesdCarModel().pipe(
      map(usedCars => {
        return usedCars
          .filter(car => {
            // Check all searchable fields in the used car object
            return (
              // Check name field
              (car.name && car.name.toLowerCase().includes(query)) ||
              // Check title field
              (car.title && car.title.toLowerCase().includes(query)) ||
              // Check brand from title (first word typically)
              (car.title && car.title.split(' ')[0].toLowerCase().includes(query)) ||
              // Check model from title (may be part of title)
              (car.title && car.title.toLowerCase().includes(query)) ||
              // Check city
              (car.city && car.city.toLowerCase().includes(query)) ||
              // Check fuel type
              (car.fuelType && car.fuelType.toLowerCase().includes(query))
            );
          })
          .map(car => ({
            id: car.carId,
            name: car.title || car.name || `${car.name} ${car.carNumber}`,
            type: 'Used Car',
            details: car
          }));
      }),
      catchError(error => {
        console.error('Error fetching used car suggestions:', error);
        return of([]);
      })
    );

    // Search in car makes/brands
    const brandSuggestions$ = of(this.allMakes).pipe(
      map(makes => {
        return makes
          .filter(make => make.name.toLowerCase().includes(query))
          .map(make => ({
            id: make.id || make.makeId,
            name: make.name,
            type: 'Brand',
            details: make
          }));
      })
    );

    // Combine all suggestions and limit to top results
    return combineLatest([
      newCarSuggestions$,
      usedCarSuggestions$,
      brandSuggestions$
    ]).pipe(
      map(([newCars, usedCars, brands]) => {
        const allSuggestions = [...newCars, ...usedCars, ...brands];
        // Sort by relevance (exact matches first)
        allSuggestions.sort((a, b) => {
          const aExact = a.name.toLowerCase() === query;
          const bExact = b.name.toLowerCase() === query;
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;

          const aStartsWith = a.name.toLowerCase().startsWith(query);
          const bStartsWith = b.name.toLowerCase().startsWith(query);
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;

          return 0;
        });

        // Limit to top 10 results
        return allSuggestions.slice(0, 10);
      })
    );
  }

  selectSuggestion(suggestion: SearchSuggestion) {
    this.searchQuery = suggestion.name;
    this.searchSuggestions = [];

    // Handle the selection based on the type
    switch (suggestion.type) {
      case 'New Car':
        // Instead of setting local variables, navigate to search results
        this.router.navigate(['/search-result'], {
          state: {
            filters: {
              searchType: 'model',
              isUsedCar: false,
              selectedModel: suggestion.name, // Using the model name
              selectedBrand: suggestion.details?.make?.name || '' // If available
            }
          }
        });
        break;

      case 'Used Car':
        if (suggestion.details) {
          // Navigate to search results for used cars
          this.router.navigate(['/used-car'], {
            state: {
              filters: {
                searchType: 'model',
                isUsedCar: true,
                selectedModel: suggestion.details.title || suggestion.name,
                selectedCity: suggestion.details.city || ''
              }
            }
          });
        }
        break;

      case 'Brand':
        // Navigate to search results for this brand
        this.router.navigate(['/used-car'], {
          state: {
            filters: {
              searchType: 'brand',
              isUsedCar: false,
              selectedBrand: suggestion.name,
              selectedModel: '' // No specific model selected
            }
          }
        });
        break;
    }
  }
  performSearch() {
    if (!this.searchQuery.trim()) {
      return;
    }

    console.log('Performing search for:', this.searchQuery);

    // Navigate to search results with the query
    this.router.navigate(['/results'], {
      state: {
        filters: {
          searchType: 'query',
          searchQuery: this.searchQuery,
          // Let the search result component determine if it's new or used cars
          // based on results from both searches
          isUsedCar: null
        }
      }
    });
  }
  // Update the searchUsedCars method to properly handle used car search
  searchUsedCars() {
    this.categoryService.getCategoryData().pipe(
      map(usedCars => usedCars.filter(car => {
        const query = this.searchQuery.toLowerCase();
        // Search across multiple fields for better results
        return (
          // Check name field
          (car.name && car.name.toLowerCase().includes(query)) ||
          // Check title field
          (car.title && car.title.toLowerCase().includes(query)) ||
          // Check city
          (car.city && car.city.toLowerCase().includes(query)) ||
          // Check fuel type
          (car.fuelType && car.fuelType.toLowerCase().includes(query)) ||
          // Check car number
          (car.carNumber && car.carNumber.toLowerCase().includes(query))
        );
      }))
    ).subscribe(usedCarsResults => {
      this.usedCarsResults = usedCarsResults;

      // If we found used cars, show them
      if (usedCarsResults.length > 0) {
        this.usedCarList = usedCarsResults;
        this.showHome = false;
        this.showExploreSection = false;

        // Emit event with used cars results
        this.selectionChanged.emit({
          category: 'Used Cars',
          usedCars: this.usedCarList
        });
        console.log('Found used cars:', usedCarsResults);
      }

      // If no results found at all
      if (this.newCarsResults.length === 0 && this.usedCarsResults.length === 0) {
        console.log('No search results found');
        // You could show a "no results" message here
      }
    });
  }
}