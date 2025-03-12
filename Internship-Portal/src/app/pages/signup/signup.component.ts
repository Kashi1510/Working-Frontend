import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignService } from '../../services/signup.service'; // ✅ Corrected import

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

  constructor(private signService: SignService, private router: Router) {} // ✅ Using SignService

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.user.password !== this.user.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      this.signService.registerUser(this.user).subscribe({
        next: (response) => {
          console.log('Signup Successful', response);
          alert('Signup Successful!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup Failed', error);
          alert('Signup Failed! ' + (error.error?.message || 'Try again.'));
        }
      });

      form.resetForm();
    }
  }
}
