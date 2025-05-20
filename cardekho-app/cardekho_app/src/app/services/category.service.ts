import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  // Base API URL

  getAllMenus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/menu-heading`);
  }

  getMenuById(menuId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/menu-heading/${menuId}`);
  }


  getCtegoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category/${id}`);
  }

  getCategoryData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/used-car-details`);

  }
  getUsedCarsByCity(city: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/used-car-details/filter/by-city/${city}`);
  }

  getModelVariants(modelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/models/${modelId}/variants`);
  }

  getModelsBySubcategory(): Observable<any[]> {
    // Implement your API call here or use mock data
    return this.http.get<any[]>(`${this.baseUrl}/model`)
      .pipe(
        catchError(error => {
          console.error('Error fetching models by subcategory', error);
          return of([]);
        })
      );
  }

  // Get cars by body type
  getCarsByBodyType(bodyType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/variant/body-type/${bodyType}`);
  }
  // Get cars by price range
  getCarsByPriceRange(minPrice: number, maxPrice: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/variant/price-filter`, {
      params: {
        min: minPrice.toString(),
        max: maxPrice.toString()
      }
    });
  }
  // Add this to your CategoryService
  getAllMakes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/make`);
  }

  getuesdCarModel(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/used-car-details`)

  }

  getVariantsByMake(makeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/variant/make/${makeId}`);
  }
  // For fetching make logo by makeId
  getMakeLogoUrl(makeId: number): string {
    return `${this.baseUrl}/make/logo/${makeId}`;
  }

  // For fetching variant image by variantId
  getVariantImageUrl(variantId: number): string {
    return `${this.baseUrl}/variant/${variantId}/image`;
  }

  getModelsByFuelType(fuelType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/model/fuel/${fuelType}`);
  }
  // New method to get model details by name
  getModelByName(modelName: string): Observable<any> {
    // First fetch all menu data
    return this.http.get<any[]>(`${this.baseUrl}/menu-heading`).pipe(
      map(menus => {
        // Search through all menus to find the model
        for (const menu of menus) {
          // Get detailed menu data for each menu ID
          const menuDetails$ = this.http.get<any>(`${this.baseUrl}/menu-heading/${menu.menuId}`);

          return menuDetails$.pipe(
            map(menuDetails => {
              // Search through categories
              for (const category of menuDetails.category || []) {
                // Search through makes
                for (const make of category.makes || []) {
                  // Search through models
                  const model = make.models?.find((m: any) => m.name === modelName);
                  if (model) {
                    return model;
                  }
                }
              }
              return null;
            })
          );
        }
        return null;
      }),
      // Flatten the Observable<Observable<any>> to Observable<any>
      // and handle the case where model is not found
      map(modelObs$ => {
        if (modelObs$) {
          return modelObs$;
        }
        throw new Error(`Model ${modelName} not found`);
      })
    );
  }

  // Alternative approach using a simpler API if available
  getModelDetailsByName(modelName: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/models/name/${modelName}`);
  }
}
