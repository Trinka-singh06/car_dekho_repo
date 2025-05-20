import { Component, OnInit } from '@angular/core';
import { CarSellRequestService, CreateCarSellRequestDto } from '../../services/car-sell-request.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sell-car',
  standalone: true,
  imports: [HttpClientModule, CommonModule,DropDownListAllModule,ReactiveFormsModule],
  providers:[CarSellRequestService, AuthService],
  templateUrl: './sell-car.component.html',
  styleUrl: './sell-car.component.css'
})
export class SellCarComponent implements OnInit {
  sellCarForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  currentStep = 1;
  totalSteps = 3;

  // Years for dropdown
  years: number[] = [];
  
  constructor(
    private fb: FormBuilder,
    private carSellRequestService: CarSellRequestService,
    private authService:AuthService,
    private router: Router
  ) {
    // Generate years from current year - 25 to current year
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 25; year--) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.initForm();
  
  }

  initForm(): void {
    this.sellCarForm = this.fb.group({
      // Step 1: Basic Details
      carMake: ['', Validators.required],
      carModel: ['', Validators.required],
      registrationYear: ['', Validators.required],
      
      // Step 2: Additional Details
      kmsDriven: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      fuelType: ['', Validators.required],
      transmission: ['', Validators.required],
      
      // Step 3: Contact Details
      ownerName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      city: ['', Validators.required]
    });
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    if (this.sellCarForm.invalid) {
      Object.keys(this.sellCarForm.controls).forEach(key => {
        const control = this.sellCarForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const request: CreateCarSellRequestDto = {
      carMake: this.sellCarForm.value.carMake,
      carModel: this.sellCarForm.value.carModel,
      registrationYear: this.sellCarForm.value.registrationYear,
      kmsDriven: this.sellCarForm.value.kmsDriven
    };

    this.carSellRequestService.createSellRequest(request).subscribe(
      response => {
        this.isSubmitting = false;
        this.router.navigate(['/my-requests'], { 
          queryParams: { success: true, requestId: response.requestId } 
        });
      },
      error => {
        this.isSubmitting = false;
        this.errorMessage = error?.error?.message || 'Failed to submit your request. Please try again.';
      }
    );
  }

}
