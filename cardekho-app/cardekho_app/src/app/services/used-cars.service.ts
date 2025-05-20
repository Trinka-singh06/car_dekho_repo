import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsedCarsService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
  getusedCars(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/menu-headin/${id}`)

  }
}
