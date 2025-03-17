import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './company-signup.component.html',
  styleUrl: './company-signup.component.css'
})
export class CompanySignupComponent {
  user = {
    companyname: '',
    city: '',
    email: '',
    password: '',
    confirmpassword: '',
    address: ''
  };

  registrationSuccess = false;
  registrationError = false;
  errorMessage: string = '';

  constructor(private companyService: CompanyService) {}

  emailError = '';
  passwordError = '';
  confirmPasswordError = '';

  // ✅ Validate email dynamically
  validateEmail(): void {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.user.email) {
      this.emailError = 'Email is required';
    } else if (!emailPattern.test(this.user.email)) {
      this.emailError = 'Invalid email format (example: user@example.com)';
    } else {
      this.emailError = '';
    }
  }

  // ✅ Validate password dynamically
  validatePassword(): void {
    if (!this.user.password) {
      this.passwordError = 'Password is required';
    } else if (this.user.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters long';
    } else {
      this.passwordError = '';
    }
    this.validateConfirmPassword();
  }

  // ✅ Validate confirm password dynamically
  validateConfirmPassword(): void {
    if (!this.user.confirmpassword) {
      this.confirmPasswordError = 'Please confirm your password';
    } else if (this.user.password !== this.user.confirmpassword) {
      this.confirmPasswordError = 'Passwords do not match';
    } else {
      this.confirmPasswordError = '';
    }
  }

  // ✅ Check if passwords match before submitting
  passwordsMatch(): boolean {
    return this.user.password === this.user.confirmpassword && this.user.password.length >= 6;
  }

  // ✅ Handle form submission
  onSubmit() {
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    if (this.emailError || this.passwordError || this.confirmPasswordError) {
      this.registrationError = true;
      this.registrationSuccess = false;
      return;
    }

    console.log('Submitting company registration:', this.user);

    this.companyService.registerCompany(this.user).subscribe({
      next: (response) => {
        console.log('Registration successful!', response);
        alert('Registration successful!');
        this.registrationSuccess = true;
        this.registrationError = false;
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.registrationSuccess = false;
        this.registrationError = true;
        this.errorMessage = 'Registration failed. Please try again!';
      }
    });
  }
}
