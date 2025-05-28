import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {
private apiUrl = 'http://localhost:3000/model'; 

  constructor(private http:HttpClient) { }

   getData(page: number, pageSize: number): Observable<any> {
  const url = `${this.apiUrl}?page=${page}&pageSize=${pageSize}`;
  return this.http.get<any>(url);
}

}
