import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ConfirmPassword: string;
  sslcPercentage: string;
  pucPercentage: string;
  degreeCgpa: string;
  skills: string;
}
@Component({
  selector: 'app-signup',
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    ConfirmPassword:'',
    sslcPercentage: '',
    pucPercentage: '',
    degreeCgpa: '',
    skills: ''
  };

  onSubmit(form: NgForm) {
  
    if (form.valid) {
      
      this.user = {
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        ConfirmPassword:'',
        sslcPercentage: '',
        pucPercentage: '',
        degreeCgpa: '',
        skills: ''
      };
      console.log("Form Submitted",this.user);
      
      

      // // Reset the form
      // form.resetForm();
    }
  
   
  }
}


