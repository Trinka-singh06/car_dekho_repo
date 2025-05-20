import { Component, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardService } from '../../services/card.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';
import { catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [CardService, CategoryService],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})

export class SearchResultComponent {
  selectedModelData: any = null;
  selectedMake: string = '';
  showVariants: boolean = false;
  currentModelVariants: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  showHome = true;
  //  filters: any;
  searchResults: any[] = [];
  @Input() filters: any;
  searchQuery: string = '';

  isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }


  // @Output() backToHome = new EventEmitter<void>();
  constructor(private router: Router, private carService: CardService, private categoryService: CategoryService) {
    // Get filters from router state
    const navigation = this.router.getCurrentNavigation();
    this.filters = navigation?.extras?.state?.['filters'];
  }

  ngOnInit(): void {
    if (this.filters) {
      // If we have a search query, handle it specially
      if (this.filters.searchType === 'query' && this.filters.searchQuery) {
        this.searchQuery = this.filters.searchQuery;
        this.performQuerySearch();
      } else {
        this.performSearch();
      }
    } else {
      // If no filters found, redirect back
      this.router.navigate(['/home']);
    }
  }

  // New method to handle plain text search queries
  performQuerySearch(): void {
    this.loading = true;
    this.error = null;
    this.searchResults = [];

    const query = this.searchQuery.toLowerCase();

    // Search for both new and used cars in parallel
    const newCarSearch$ = this.carService.getAllModels().pipe(
      map(models => models.filter(model =>
        model.name.toLowerCase().includes(query) ||
        (model.make?.name && model.make.name.toLowerCase().includes(query))
      )),
      catchError(error => {
        console.error('Error searching new cars:', error);
        return of([]);
      })
    );

    const usedCarSearch$ = this.categoryService.getCategoryData().pipe(
      map(usedCars => usedCars.filter(car => {
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
      })),
      catchError(error => {
        console.error('Error searching used cars:', error);
        return of([]);
      })
    );

    // Combine results
    forkJoin({
      newCars: newCarSearch$,
      usedCars: usedCarSearch$
    }).subscribe(results => {
      // Combine and format search results
      const formattedNewCars = results.newCars.map(model => {
        return {
          id: model.id || model.modelId,
          name: model.name,
          title: `${model.make?.name || ''} ${model.name}`,
          images: model.images || '',
          price: model.price || '',
          variant: {
            model: model,
            price: model.price
          },
          isNewCar: true
        };
      });

      // Format used car results similarly
      const formattedUsedCars = results.usedCars.map(car => {
        return {
          id: car.carId,
          name: car.name,
          title: car.title,
          images: car.images,
          price: car.price,
          city: car.city,
          kmsDriven: car.kmsDriven,
          fuelType: car.fuelType,
          transmission: car.transmission,
          body_type: car.body_type,
          isUsedCar: true
        };
      });

      // Combine both results
      this.searchResults = [...formattedNewCars, ...formattedUsedCars];

      // Log search results
      console.log('Search Results:', this.searchResults);
      this.loading = false;

      // Update filter based on what we found
      if (this.searchResults.length > 0) {
        if (formattedNewCars.length > 0 && formattedUsedCars.length === 0) {
          this.filters.isUsedCar = false;
        } else if (formattedNewCars.length === 0 && formattedUsedCars.length > 0) {
          this.filters.isUsedCar = true;
        }
        // If we have both, leave as null to show both types
      }
    }, error => {
      console.error('Search failed', error);
      this.error = 'Failed to fetch search results. Please try again.';
      this.searchResults = [];
      this.loading = false;
    });
  }
  performSearch(): void {
    this.loading = true;
    this.error = null;
    this.searchResults = [];

    let search$;

    try {
      if (!this.filters.isUsedCar && this.filters.searchType === 'budget') {
        search$ = this.carService.searchNewCarsByBudget(
          this.filters.selectedBudget,
          this.filters.selectedCarType
        );
      } else if (!this.filters.isUsedCar && this.filters.searchType === 'brand') {
        search$ = this.carService.searchNewCarsByModel(
          this.filters.selectedBrand,
          this.filters.selectedModel
        );
      } else if (this.filters.isUsedCar && this.filters.searchType === 'budget') {
        search$ = this.carService.searchUsedCarsByBudget(
          this.filters.selectedBudget,
          this.filters.selectedCity
        );
      } else {
        search$ = this.carService.searchUsedCarsByModel(
          this.filters.selectedModel,
          this.filters.selectedCity
        );
      }

      search$.subscribe(
        data => {
          this.searchResults = data;
          this.loading = false;
        },
        err => {
          console.error('Search failed', err);
          this.error = 'Failed to fetch search results. Please try again.';
          this.searchResults = [];
          this.loading = false;
        }
      );
    } catch (e) {
      console.error('Error in search', e);
      this.error = 'An unexpected error occurred. Please try again.';
      this.loading = false;
    }
  }

  onViewModelVariants(model: any): void {
    this.selectedModelData = model;
    if (!this.selectedModelData) return;

    this.currentModelVariants = this.selectedModelData.variants || [];
    this.showVariants = true;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
