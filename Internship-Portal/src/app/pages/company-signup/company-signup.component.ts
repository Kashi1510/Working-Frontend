import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service'; // ✅ Import service


@Component({
  selector: 'app-company-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, ], // ✅ Ensure HttpClientModule is imported
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
  errorMessage: string = ''; // Store error messages

  constructor(private companyService: CompanyService) {} // ✅ Inject service

  // ✅ Check if passwords match before sending the request
  passwordsMatch(): boolean {
    return this.user.password === this.user.confirmpassword;
  }

  onSubmit() {
    console.log('Form submitted', this.user);

    if (!this.passwordsMatch()) {
      console.log('Passwords do not match');
      this.registrationError = true;
      this.registrationSuccess = false;
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // ✅ Send data to backend
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
