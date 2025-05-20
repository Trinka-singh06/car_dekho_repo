import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  // Budget ranges for dropdown
  getBudgetRanges(): Observable<string[]> {
    return of([
      '1 - 5 Lakh',
      '5 - 10 Lakh',
      '10 - 15 Lakh',
      '15 - 20 Lakh',
      '20 - 35 Lakh',
      '35 - 50 Lakh',
      '50 Lakh - 1 Crore',
      'Above 1 Crore'
    ]);
  }


  getAllUsedCarModels(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/used-car-details/models/all`).pipe(
      catchError(error => {
        console.error('Error fetching all used car models:', error);
        return of([]);
      })
    );
  }

  // Get all car brands/makes
  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/make`).pipe(
      catchError(error => {
        console.error('Error fetching brands:', error);
        return of([]);
      })
    );
  }
  // Get cities - UPDATED to use the correct endpoint
  getCities(query: string = ''): Observable<any[]> {
    console.log('Fetching cities with query:', query);
    // Update the endpoint to match your backend controller
    const url = query
      ? `${this.apiUrl}/used-car-details/cities?q=${query}`
      : `${this.apiUrl}/used-car-details/cities`;

    return this.http.get<any[]>(url).pipe(
      retry(2), // Retry up to 2 times if there's a network issue
      catchError(error => {
        console.error('Error fetching cities:', error);
        // Return an empty array with a console warning
        return of([]);
      })
    );
  }
  // Get car types (body types)
  getCarTypes(): Observable<any[]> {
    return of([
      { name: 'SUV' },
      { name: 'Hatchback' },
      { name: 'Sedan' },
      { name: 'MUV' },
      { name: 'Luxury' }
    ]);
  }

  // Get car models by brand ID
  getModels(brandId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/model/filter/by-make?makeId=${brandId}`).pipe(
      catchError(error => {
        console.error('Error fetching models for brand ID:', brandId, error);
        return of([]);
      })
    );
  }
  // Corrected getAllModels method
  getAllModels(): Observable<any[]> {
    // Replace with your actual API endpoint
    const url = `${this.apiUrl}/model`;
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching all models:', error);
        return of([]);
      })
    );
  }


  // Get car types available for a budget range (for new cars)
  getCarTypesByBudget(budget: string): Observable<any[]> {
    const { min, max } = this.parseBudgetRange(budget);

    // For simplicity, return all car types, but in a real app, you might filter by budget
    return this.getCarTypes();
  }

  // Search new cars by budget and car type
  searchNewCarsByBudget(budget: string, carType: string): Observable<any[]> {
    const { min, max } = this.parseBudgetRange(budget);

    if (!carType) {
      // If no car type is selected, search by price range only
      return this.http.get<any[]>(`${this.apiUrl}/model/filter/by-price-range?minPrice=${min}&maxPrice=${max}`);
    }
    else {
      // Search by both price range and body type
      return this.http.get<any[]>(
        `${this.apiUrl}/model/filter/by-price-and-body?minPrice=${min}&maxPrice=${max}&bodyType=${carType}`
      );
    }
  }

  // Search new cars by brand and model
  searchNewCarsByModel(brand: string, model: string): Observable<any[]> {
    if (!brand) {
      return of([]);
    }

    return this.getBrandIdByName(brand).pipe(
      switchMap(brandId => {
        if (!brandId) {
          console.error('Cannot find brand ID for:', brand);
          return of([]);
        }

        if (!model) {
          // If no model is selected, get all models for the brand
          return this.http.get<any[]>(`${this.apiUrl}/model/filter/by-make?makeId=${brandId}`).pipe(
            catchError(error => {
              console.error('Error fetching models for brand:', error);
              return of([]);
            })
          );
        } else {
          // Search for the specific model
          return this.http.get<any[]>(`${this.apiUrl}/model/filter/by-make-and-model?makeId=${brandId}&modelName=${model}`).pipe(
            catchError(error => {
              console.error('Error fetching specific model:', error);
              return of([]);
            })
          );
        }
      }),
      catchError(error => {
        console.error('Error searching by brand and model:', error);
        return of([]);
      })
    );
  }


  // Search used cars by budget and city
  searchUsedCarsByBudget(budget: string, city: string): Observable<any[]> {
    const { min, max } = this.parseBudgetRange(budget);

    let url = `${this.apiUrl}/used-car-details/filter/by-price-range?minPrice=${min}&maxPrice=${max}`;

    if (city) {
      url = `${this.apiUrl}/used-car-details/filter/by-city/${city}`;
    }

    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Error searching used cars by budget:', error);
        return of([]);
      })
    );
  }

  // Search used cars by brand, model and city
  searchUsedCarsByModel(model: string, city?: string): Observable<any[]> {
    if (!model) {
      console.error('No model provided for searchUsedCarsByModel');
      return of([]);
    }

    const endpoint = city
      ? `${this.apiUrl}/used-car-details/filter/by-model-and-city`
      : `${this.apiUrl}/used-car-details/filter/by-model`;

    let params = new HttpParams().set('modelName', model);
    if (city) {
      params = params.set('city', city);
    }

    return this.http.get<any[]>(endpoint, { params }).pipe(
      catchError(error => {
        console.error('Error searching used cars by model and city:', error);
        return of([]);
      })
    );
  }


  // Helper method to parse budget range string to min and max values
  private parseBudgetRange(budget: string): { min: number, max: number } {
    // Default values
    let min = 0;
    let max = 10000000; // 1 crore default max

    switch (budget) {
      case '1 - 5 Lakh':
        min = 100000;
        max = 500000;
        break;
      case '5 - 10 Lakh':
        min = 500000;
        max = 1000000;
        break;
      case '10 - 15 Lakh':
        min = 1000000;
        max = 1500000;
        break;
      case '15 - 20 Lakh':
        min = 1500000;
        max = 2000000;
        break;
      case '20 - 35 Lakh':
        min = 2000000;
        max = 3500000;
        break;
      case '35 - 50 Lakh':
        min = 3500000;
        max = 5000000;
        break;
      case '50 Lakh - 1 Crore':
        min = 5000000;
        max = 10000000;
        break;
      case 'Above 1 Crore':
        min = 10000000;
        max = 1000000000; // 100 crore
        break;
    }

    return { min, max };
  }

  // Helper method to get brand ID by name
  private getBrandIdByName(brandName: string): Observable<number | null> {
    return this.getBrands().pipe(
      map(brands => {
        const brand = brands.find(b => b.name === brandName);
        return brand ? (brand.id || brand.makeId) : null;
      })
    );
  }

  // Helper method to get model by name and brand
  private getModelByNameAndBrand(modelName: string, brandName: string): Observable<any> {
    return this.getBrandIdByName(brandName).pipe(
      map(brandId => {
        if (!brandId) return [];
        return this.http.get<any[]>(`${this.apiUrl}/model/filter/by-make?makeId=${brandId}`).pipe(
          map(models => models.filter(m => m.name === modelName))
        );
      })
    );
  }

}