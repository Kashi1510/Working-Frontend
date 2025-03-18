import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet,RouterLink,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'Internship Portal';
  userType: string | null = null; // ✅ Store user type

  constructor(private router: Router) {}

  ngOnInit() {
    // ✅ Ensure localStorage is only accessed in the browser
    if (typeof window !== 'undefined' && window.localStorage) {
      this.userType = localStorage.getItem('userType');
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('userType'); // ✅ Clear userType on logout
    }
    this.userType = null;
    this.router.navigate(['/login']); // ✅ Redirect to login page
  }
  
} 
