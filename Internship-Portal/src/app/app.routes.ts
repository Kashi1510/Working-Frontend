import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { EmployerDashboardComponent } from './pages/employer-dashboard/employer-dashboard.component';
import { InternshipListComponent } from './pages/internship-list/internship-list.component';
import { InternshipDetailsComponent } from './pages/internship-details/internship-details.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CompanySignupComponent } from './pages/company-signup/company-signup.component';



export const routes: Routes = [
    { path: '',component:HomeComponent },
    {path:'company-signup',component:CompanySignupComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'student-dashboard',component:StudentDashboardComponent},
    {path:'employer-dashboard',component:EmployerDashboardComponent},
    {path:'internships',component:InternshipListComponent},
    {path:'internship/id',component:InternshipDetailsComponent},
    {path:'home',component:HomeComponent}
    
    
];
