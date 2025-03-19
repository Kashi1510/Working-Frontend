import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    sslcPercentage: '',
    pucPercentage: '',
    degreeCgpa: '',
    skills: ''
  };

  errors: any = {};

  constructor(private signupService: SignService, private router: Router) {}

  validateField(field: string) {
    switch (field) {
      case 'firstName':
        this.errors.firstName = /^[A-Z][a-z]*$/.test(this.user.firstName)
          ? ''
          : 'First Name should start with a capital letter.';
        break;
      case 'lastName':
        this.errors.lastName = /^[A-Z][a-z]*$/.test(this.user.lastName)
          ? ''
          : 'Last Name should start with a capital letter.';
        break;
      case 'email':
        this.errors.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.user.email)
          ? ''
          : 'Invalid email format.';
        break;
      case 'password':
        this.errors.password = this.user.password.length >= 6
          ? ''
          : 'Password must be at least 6 characters long.';
        break;
      case 'confirmPassword':
        this.errors.confirmPassword = this.user.password === this.user.confirmPassword
          ? ''
          : 'Passwords do not match.';
        break;
      case 'sslcPercentage':
        this.errors.sslcPercentage = /^([0-9]|[1-9][0-9]|100)(\.\d{1,2})?$/.test(this.user.sslcPercentage)
          ? ''
          : 'SSLC Percentage must be between 0 and 100.';
        break;
      case 'pucPercentage':
        this.errors.pucPercentage = /^([0-9]|[1-9][0-9]|100)(\.\d{1,2})?$/.test(this.user.pucPercentage)
          ? ''
          : 'PUC Percentage must be between 0 and 100.';
        break;
      case 'degreeCgpa':
        this.errors.degreeCgpa = /^([0-9]|10)(\.\d{1,2})?$/.test(this.user.degreeCgpa)
          ? ''
          : 'Degree CGPA must be between 0 and 10.';
        break;
    }
  }

  isFormValid(): boolean {
    return !Object.values(this.errors).some(error => error);
  }

  onSubmit(form: NgForm) {
    if (!this.isFormValid()) {
      console.log('Form validation failed', this.errors);
      return;
    }

    console.log('Submitting User Object:', this.user);

    this.signupService.registerUser(this.user).subscribe({
      next: (response) => {
        console.log('Signup Successful', response);
        alert('Signup Successful! Redirecting to login...');
        form.resetForm();
        setTimeout(() => this.router.navigate(['/login']), 500);
      },
      error: (error) => {
        console.error('Signup Failed', error);
        alert('Signup Failed! ' + (error.error?.message || 'Try again.'));
      }
    });
  }
}