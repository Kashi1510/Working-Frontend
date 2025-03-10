import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface User {
  CompanyName: string;
  City: string;
  Email: string;
  Password: string;
  Confirmpassword: string;
  Address: string;
}

@Component({
  selector: 'app-company-signup',
  imports: [FormsModule,CommonModule],
  templateUrl: './company-signup.component.html',
  styleUrl: './company-signup.component.css'
})
export class CompanySignupComponent {
  user = {
    CompanyName: '',
    City: '',
    Email: '',
    Password: '',
    Confirmpassword: '',
    Address: ''
  };

  registrationSuccess = false;
  registrationError = false;

  // Method to check if passwords match
  passwordsMatch(): boolean {
    return this.user.Password === this.user.Confirmpassword;
  }

  
  onSubmit() {
   
    console.log('Form submitted', this.user);

   
    if (this.passwordsMatch()) {
     
      this.registrationSuccess = true;
      this.registrationError = false;
      console.log('Registration successful:', this.user);
    } else {
      // Simulate failure
      this.registrationError = true;
      this.registrationSuccess = false;
      console.log('Passwords do not match');
    }
  }

 
}

