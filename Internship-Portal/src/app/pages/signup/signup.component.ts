import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  sslcPercentage: string;
  pucPercentage: string;
  degreeCgpa: string;
  skills: string;
}
@Component({
  selector: 'app-signup',
  imports: [CommonModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    sslcPercentage: '',
    pucPercentage: '',
    degreeCgpa: '',
    skills: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      
      this.user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        sslcPercentage: '85%',
        pucPercentage: '90%',
        degreeCgpa: '8.5',
        skills: 'JavaScript, Angular, TypeScript'
      };

      // Reset the form
      form.resetForm();
    }
  
   
  }
}


