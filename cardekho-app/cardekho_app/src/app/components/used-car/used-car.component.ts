import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoginRegisterComponent } from "../login-register/login-register.component";
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-used-car',
  standalone: true,
  imports: [CommonModule, LoginRegisterComponent, HttpClientModule],
  providers:[AuthService],
  templateUrl: './used-car.component.html',
  styleUrl: './used-car.component.css'
})
export class UsedCarComponent {
  @Input() usedCars: any[] = [];
  visibleSellers: { [carId: number]: boolean } = {};
  isLoggedIn = false; // Flag for login
  showLoginPopup = false;
  pendingCarId: number | null = null;
  selectedCarId: number | null = null;  
  expandedCarId: number | null = null; 
  
  imageBaseUrl = 'http://localhost:3000/uploads/car-images/';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Check initial login status
    this.isLoggedIn = this.authService.isLoggedIn();
    
    // Subscribe to auth state changes
    this.authService.authStateChanged.subscribe((loggedIn: boolean) => {
      console.log('Auth state changed:', loggedIn);
      this.isLoggedIn = loggedIn;
      
      // If user just logged in and we have a pending car ID, show the seller
      if (loggedIn && this.pendingCarId !== null) {
        this.visibleSellers[this.pendingCarId] = true;
        this.pendingCarId = null;
      }
    });
  }
  onViewCarDetails(carId: number) {
    if (this.selectedCarId === carId) {
      this.selectedCarId = null;
      // If we're closing the car details and seller details aren't visible, clear expandedCarId
      if (!this.visibleSellers[carId]) {
        this.expandedCarId = null;
      }
    } else {
      this.selectedCarId = carId;
      this.expandedCarId = carId; // Mark this car as expanded
    }
  }
  
  onViewSeller(carId: number) {
    console.log('View seller clicked for car ID:', carId);
    
    if (this.authService.isLoggedIn()) {
      // Toggle visibility directly
      this.visibleSellers[carId] = !this.visibleSellers[carId];
      
      // If we're showing seller details, mark this car as expanded
      if (this.visibleSellers[carId]) {
        this.expandedCarId = carId;
      } else if (this.expandedCarId === carId && !this.selectedCarId) {
        // If we're hiding seller details and car details aren't shown, clear expandedCarId
        this.expandedCarId = null;
      }
      
      console.log('Toggled seller visibility for car ID:', carId, 'now:', this.visibleSellers[carId]);
    } else {
      // Store the car ID and show login
      this.pendingCarId = carId;
      this.showLoginPopup = true;
      console.log('Showing login popup, pending car ID:', carId);
    }
  }
  
  onLoginSuccess() {
    console.log('Login success event received');
    this.isLoggedIn = true;
    this.showLoginPopup = false;
    
    // Show seller details for the pending car ID
    if (this.pendingCarId !== null) {
      this.visibleSellers[this.pendingCarId] = true;
      this.expandedCarId = this.pendingCarId; // Mark this car as expanded after login
      console.log('Showing seller for car ID after login:', this.pendingCarId);
      // this.pendingCarId = null;
    }
  }
  
  closeLogin() {
    this.showLoginPopup = false;
    this.pendingCarId = null;
  }
  
  // Add this new method to close the expanded view
  closeExpandedView() {
    this.expandedCarId = null;
    this.selectedCarId = null;
    
    // Clear all visible sellers
    Object.keys(this.visibleSellers).forEach(key => {
      this.visibleSellers[parseInt(key)] = false;
    });
  }
  
  // Existing debug method
  logCarData() {
    console.log('Used cars data:', this.usedCars);
    // Check if the first car has seller information
    if (this.usedCars.length > 0) {
      console.log('First car seller:', this.usedCars[0].seller);
    }
  }
}