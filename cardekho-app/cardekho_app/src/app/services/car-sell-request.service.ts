import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface CarSellRequest {
  requestId: number;
  status: string;
  comments?: string;
  requestDate: Date;
  inspectionDate?: Date;
  valuationAmount?: number;
  carDetail?: any;
}

export interface CreateCarSellRequestDto {
  // Add any initial details you need for car sell request
  carMake?: string;
  carModel?: string;
  registrationYear?: string;
  kmsDriven?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarSellRequestService {

  private apiUrl = `http://localhost:3000/car-sell-requests`;

  constructor(private http: HttpClient) {
  }



  // Create a new sell request
  createSellRequest(request: CreateCarSellRequestDto): Observable<CarSellRequest> {
    return this.http.post<CarSellRequest>(this.apiUrl, request);
  }

  // Get all requests for the logged-in user
  getUserRequests(): Observable<CarSellRequest[]> {
    return this.http.get<CarSellRequest[]>(this.apiUrl);
  }

  // Get a specific request by ID
  getRequestById(id: number): Observable<CarSellRequest> {
    return this.http.get<CarSellRequest>(`${this.apiUrl}/${id}`);
  }

  // Admin endpoints
  getAllRequests(): Observable<CarSellRequest[]> {
    return this.http.get<CarSellRequest[]>(`${this.apiUrl}/admin/all`);
  }

  updateStatus(id: number, status: string, comments?: string): Observable<CarSellRequest> {
    return this.http.patch<CarSellRequest>(`${this.apiUrl}/${id}/status`, { status, comments });
  }

  scheduleInspection(id: number, inspectionDate: Date): Observable<CarSellRequest> {
    return this.http.patch<CarSellRequest>(`${this.apiUrl}/${id}/inspection`, { inspectionDate });
  }

  setValuation(id: number, valuationAmount: number): Observable<CarSellRequest> {
    return this.http.patch<CarSellRequest>(`${this.apiUrl}/${id}/valuation`, { valuationAmount });
  }

  approveAndCreateListing(id: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/approve`, formData);
  }
}
