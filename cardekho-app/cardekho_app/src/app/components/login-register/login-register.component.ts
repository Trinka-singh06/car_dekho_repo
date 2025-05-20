import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  @Output() closeModalEvent = new EventEmitter();
  @Output() loginSuccess = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  userName: string = '';  // Add this property
  mobileNumber: string = '';
  otp: string = '';
  otpSent: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.closeModalEvent.emit();
    this.close.emit();
  }

  sendOTP(): void {
    if (this.mobileNumber && this.mobileNumber.length === 10 && this.userName) {
      this.authService.sendOTP(this.mobileNumber, this.userName).subscribe(
        response => {
          console.log('OTP sent successfully', response);
          this.otpSent = true;
        },
        error => {
          console.error('Error sending OTP', error);
        }
      );
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  }

  verifyOTP(): void {
    if (this.otp && this.otp.length === 4) {
      this.authService.verifyOTP(this.mobileNumber, this.otp).subscribe(
        response => {
          console.log('OTP verified successfully', response);
          this.authService.setCurrentUser(response.user);
          this.closeModal();
          this.loginSuccess.emit(); // This will trigger the onLoginSuccess in navbar
          this.close.emit();
          // Refresh page or update UI to show logged in state

        },
        error => {
          console.error('Error verifying OTP', error);
          alert('Invalid OTP. Please try again.');
        }
      );
    } else {
      alert('Please enter a valid OTP');
    }
  }
}
