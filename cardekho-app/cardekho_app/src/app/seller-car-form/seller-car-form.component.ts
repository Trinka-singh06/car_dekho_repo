import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injector, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';
import { ToastComponent, ToastModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-seller-car-form',
  standalone: true,
  imports: [FormsModule, ToastModule, ReactiveFormsModule, DropDownListAllModule, TextAreaModule,CommonModule],
  templateUrl: './seller-car-form.component.html',
  styleUrl: './seller-car-form.component.css'
})
export class SellerCarFormComponent implements OnInit{
  toastObj: ToastComponent;
  sellerForm: FormGroup;
  carForm: FormGroup;
  currentStep = 1;
  isSubmitting = false;

  
  states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal'
  ];
  
  cities: { [key: string]: string[] } = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    // Add more states and their cities as needed
  };
  
  fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];
  transmissionTypes = ['Manual', 'Automatic', 'CVT', 'DCT', 'AMT'];
  ownershipOptions = ['1st Owner', '2nd Owner', '3rd Owner', '4th Owner or more'];
  years = Array.from({length: 30}, (_, i) => new Date().getFullYear() - i);
  insuranceOptions = ['Comprehensive', 'Third-party', 'Zero Depreciation', 'Not Insured'];
  bodyTypes = ['Hatchback', 'Sedan', 'SUV', 'MUV', 'Coupe', 'Luxury', 'Jeep'];
  selectedFile: File | null = null;
 
  selectedFileName = '';
  selectedCities: string[] = [];
  apiBaseUrl = 'http://localhost:3000'; // Update with your API base URL

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router,
     private elRef: ElementRef,
     private renderer: Renderer2,
     private viewContainerRef: ViewContainerRef,
     private injector: Injector

  ) {
    this.sellerForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      contactAdderess: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.carForm = this.fb.group({
      name: ['', [Validators.required]],
      title: ['', [Validators.required]],
      body_type: ['', [Validators.required]],
      carNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/)]],
      price: ['', [Validators.required]],
      lenght: [''], // typo in your entity, kept as is
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      fuelType: ['', [Validators.required]],
      registrationYear: ['', [Validators.required]],
      insurance: [''],
      seats: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      kmsDriven: ['', [Validators.required]],
      Rto: [''], // capitalization as per your entity
      ownership: ['', [Validators.required]],
      engine: [''],
      mileage: ['', [Validators.required]],
      power: [''],
      numberofAirbags: [0, [Validators.min(0), Validators.max(10)]],
      engineDisplacement: [''],
      transmission: ['', [Validators.required]],
      yearofManufacture: ['', [Validators.required]],
      categoryId: [17] // Default to Used Cars category
    });
    
    // this.toastObj = new ToastComponent();
  }

  ngOnInit(): void {
    this.toastObj = new ToastComponent(this.elRef, this.renderer, this.viewContainerRef, this.injector);
    this.toastObj.appendTo('#toastContainer'); // Assumes you have an element with ID "toastContainer"
  }

  ngAfterViewInit(): void {
    this.toastObj.show({
      title: 'Information',
      content: 'Form loaded successfully',
      cssClass: 'e-toast-info',
      position: { X: 'Right', Y: 'Top' },
      timeOut: 5000
    });
  }

  onStateChange(event: any): void {
    const selectedState = event.value || event.target.value;
    this.selectedCities = this.cities[selectedState] || [];
    this.carForm.get('city')?.setValue('');
  }

  nextStep(): void {
    if (this.sellerForm.valid) {
      this.currentStep = 2;
    } else {
      this.markFormGroupTouched(this.sellerForm);
      this.showToast('Please fill all required seller details');
    }
  }

  prevStep(): void {
    this.currentStep = 1;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }

  
  resetForms(): void {
    this.sellerForm.reset();
    this.carForm.reset();
    this.selectedFile = null;
    this.selectedFileName = '';
    this.selectedCities = [];
    this.currentStep = 1;
    this.showToast('Forms have been reset', 'info');
  }
  
  async onSubmit(): Promise<void> {
    if (!this.sellerForm.valid || !this.carForm.valid) {
      this.markFormGroupTouched(this.sellerForm);
      this.markFormGroupTouched(this.carForm);
      this.showToast('Please fill all required fields');
      return;
    }

    this.isSubmitting = true;

    try {
      // Step 1: Create seller record
      const sellerResponse = await this.http.post<any>(`${this.apiBaseUrl}/seller`, this.sellerForm.value).toPromise();
      const sellerId = sellerResponse.selllerId;

      // Step 2: Create car record with seller ID
      const formData = new FormData();
      
      // Add car form values to formData
      Object.keys(this.carForm.value).forEach(key => {
        formData.append(key, this.carForm.value[key]);
      });
      
      // Add seller ID to formData
      formData.append('sellerId', sellerId);
      
      // Add image file if selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      // Submit car data
      await this.http.post(`${this.apiBaseUrl}/used-car-details`, formData).toPromise();

      this.showToast('Car listing created successfully!', 'success');
      setTimeout(() => {
        this.router.navigate(['/used-cars']);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      this.showToast('Failed to submit the form. Please try again.', 'error');
    } finally {
      this.isSubmitting = false;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private showToast(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): void {
    this.toastObj.show({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      content: message,
      cssClass: `e-toast-${type}`,
      position: { X: 'Right', Y: 'Top' },
      timeOut: 5000
    });
  }

 
}
