import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  
  // Changed from 'token' to 'auth_token' to match your AuthService
  const token = localStorage.getItem('auth_token');
  
  // Add some debugging
  console.log('Interceptor running for:', request.url);
  console.log('Token found:', !!token);

  // If token exists, clone the request and add the Authorization header
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request).pipe(
    catchError(error => {
      console.error('Request error:', error);
      if (error.status === 401 || error.status === 403) {
        console.log('Unauthorized, redirecting to login');
        localStorage.removeItem('auth_token'); // Changed from 'token' to 'auth_token'
        localStorage.removeItem('user');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};