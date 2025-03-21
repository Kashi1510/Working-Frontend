import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

export interface LoginResponse {
  company?: {
    id: number;
    companyname: string;
    email: string;
  };
  student?: {
    studentId: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  error?: string; // Error message if login fails
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  showSuccessMessage = false;
  loginError = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    this.loginService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log("API Response:", response); // Debugging API response
  
        this.showSuccessMessage = true;
        this.loginError = false;
  
        // 🔹 Check if response contains company login
        if (response?.companyname) { 
          localStorage.setItem("companyId", response.id.toString());
          localStorage.setItem("userName", response.companyname);
          localStorage.setItem("userEmail", response.email);
          localStorage.setItem("userRole", "COMPANY");
  
          console.log("Navigating to /employer-dashboard");
          this.router.navigate(['/employer-dashboard']);
        }
        // 🔹 Check if response contains student login (not wrapped in `student`)
        else if (response?.firstName && response?.lastName) { 
          localStorage.setItem("studentId", response.id.toString());
          localStorage.setItem("userName", response.firstName + " " + response.lastName);
          localStorage.setItem("userEmail", response.email);
          localStorage.setItem("userRole", "STUDENT");
  
          console.log("Navigating to /student-dashboard");
          this.router.navigate(['/student-dashboard']);
        }
        // 🔹 Handle Unexpected Response
        else {
          console.error("Invalid API Response:", response);
          this.loginError = true;
          this.errorMessage = "Invalid credentials. Please try again.";
        }
      },
      error: (error) => {
        console.error("Login failed:", error);
        this.loginError = true;
        this.errorMessage = "Invalid email or password!";
      }
    });
  }
}  