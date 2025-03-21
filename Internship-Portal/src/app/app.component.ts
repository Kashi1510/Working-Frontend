import { Component } from '@angular/core';
import { NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { filter } from 'rxjs';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'Internship Portal';
  userType: string | null = null; // ✅ Store user type
  showNavbar: boolean = false;
  userName!: string | null;
  isEmployer: boolean = false;
  isStudent: boolean = false;
  isNavbarOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUserStatus();
  
    // Hide navbar on login and registration pages
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const noNavbarRoutes = ['/login', '/registration', '/'];
      this.showNavbar = !noNavbarRoutes.includes(event.url);
    });
  }
  
  checkUserStatus() {
    this.userName = localStorage.getItem('userName');
    this.isEmployer = localStorage.getItem('userType') === 'employer';
    this.isStudent = localStorage.getItem('userType') === 'student';
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.isNavbarOpen = false; // Close navbar on logout
  }
  
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen; // Toggle navbar state
  }
  
  closeNavbar() {
    this.isNavbarOpen = false; // Close navbar when a link is clicked
  }
}
