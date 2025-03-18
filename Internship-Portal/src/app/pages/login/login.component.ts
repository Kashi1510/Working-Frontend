import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // ✅ Ensure these modules are included
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe(
      (response) => {
        if (response.dashboard) {
          console.log('Login successful!', response);
          alert('Login successful!');

          // ✅ Save user type in localStorage (optional chaining prevents errors)
          if (response.userType) {
            localStorage.setItem('userType', response.userType);
          }

          // ✅ Open dashboard in a new tab
          window.open(response.dashboard, '_blank');

          // ✅ Reload the page to update navbar
          setTimeout(() => {
            window.location.reload();
          }, 500); 
        } else {
          alert(response.error || 'Invalid email or password!');
        }
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed! Please try again.');
      }
    );
  }
}
