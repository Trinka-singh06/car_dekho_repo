import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'; // Your NestJS backend URL
  public authStateChanged = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }



  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  sendOTP(mobileNumber: string, userName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { mobileNumber, userName });
  }


  verifyOTP(mobileNumber: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { mobileNumber, otp })
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.authStateChanged.emit(true);
          }
        })
      );
  }


  isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem('auth_token');
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.authStateChanged.emit(true);
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      this.authStateChanged.emit(false);
    }
  }
}
