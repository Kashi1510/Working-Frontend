import { Component, OnInit } from '@angular/core';
//import { InternshipsService } from '../../services/internships.service';
import { CommonModule } from '@angular/common';
import { InternshipService } from '../../service/internship.service';
import { ApplicationService } from '../../services/application.service';
import { Router, RouterModule } from '@angular/router';
import { error } from 'node:console';
import { StudentService } from '../../services/student.service';


@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
// internships: any[] = [];
// applications: any[] = [];
// student: any = {}; // Holds student profile details
// studentId: number = 1; // Assume logged-in student ID
// showInternshipsSection: boolean = true;
// showApplicationsSection: boolean = false;
// showProfileSection: boolean = false;

// constructor(
//   private internshipService: InternshipService,
//   private applicationService: ApplicationService,
//   private studentService: StudentService,
//   private router: Router
// ) {}

// ngOnInit(): void {
//   this.getInternships();
//   this.getStudentProfile();
// }

// // Fetch Internships
// getInternships(): void {
//   this.internshipService.getInternships().subscribe(data => {
//     this.internships = data;
//   });
// }

// // Fetch Student Profile
// getStudentProfile(): void {
//   this.studentService.getStudentById(this.studentId).subscribe(data => {
//     this.student = data;
//   });
// }

// // Apply for an Internship
// applyInternship(internshipId: number): void {
//   const applicationData = {
//     student: { id: this.studentId },
//     internship: { id: internshipId },
//     appliedDate: new Date()
//   };
//   this.applicationService.applyForInternship(applicationData).subscribe(() => {
//     alert('Application submitted successfully');
//     this.getApplications();
//   });
// }

// // Fetch Student Applications
// getApplications(): void {
//   this.applicationService.getApplicationsByStudent(this.studentId).subscribe(data => {
//     this.applications = data;
//   });
// }

// // Toggle to show Profile Section
// showProfile(): void {
//   this.showProfileSection = true;
//   this.showInternshipsSection = false;
//   this.showApplicationsSection = false;
// }

// // Toggle to show Available Internships Section
// showInternships(): void {
//   this.showInternshipsSection = true;
//   this.showApplicationsSection = false;
//   this.showProfileSection = false;
// }

// // Toggle to show My Applications Section
// showApplications(): void {
//   this.showInternshipsSection = false;
//   this.showApplicationsSection = true;
//   this.showProfileSection = false;
//   this.getApplications();
// }

// // Sign out and redirect to login page
// signOut(): void {
//   localStorage.removeItem('token'); // Remove authentication token
//   this.router.navigate(['/login']); // Redirect to login page
// }
internships: any[] = [];
applications: any[] = [];
student: any = {}; // Holds student profile details
studentId: number = 1; // Assume logged-in student ID
showInternshipsSection: boolean = true;
showApplicationsSection: boolean = false;
showProfileSection: boolean = false;
appliedCompanies: Set<string> = new Set(); // To track applied companies
  getApplicationsByStudent: any={};


constructor(
  private internshipService: InternshipService,
  private applicationService: ApplicationService,
  private studentService: StudentService,
  private router: Router
) {}

ngOnInit(): void {
  this.getInternships();
  this.getStudentProfile();
  
  this.getApplications(); // Fetch applications to update appliedCompanies
  const studentId = 1; // Replace with actual logged-in student ID
  this.getApplicationsByStudent(studentId);
}


// Fetch Internships
getInternships(): void {
  this.internshipService.getInternships().subscribe(data => {
    this.internships = data;
  });
}

// Fetch Student Profile
getStudentProfile(): void {
  this.studentService.getStudentById(this.studentId).subscribe(data => {
    this.student = data;
  });
}

// Fetch Student Applications
getApplications(): void {
  this.applicationService.getApplicationsByStudent(this.studentId).subscribe({
    next:(data) => {
      console.log("API Response:", data); // Debugging API Response
      this.applications = data;
      console.log("Applications",this.applications);
    },
    error:(error) => {
      console.error("Error fetching applications:", error);
    }}
  );
  
}


// Apply for an Internship
applyInternship(internship: any): void {
  if (this.appliedCompanies.has(internship.company)) {
    alert('You have already applied for an internship at this company.');
    return;
  }

  const applicationData = {
    student: { id: this.studentId },
    internship: { id: internship.id },
    
    appliedDate: new Date(),
    interviewDate: new Date()
  };

  this.applicationService.applyForInternship(applicationData).subscribe(() => {
    alert('Application submitted successfully');
    
    // Add company to the applied companies set
    this.appliedCompanies.add(internship.company);
    
    this.getApplications();
  });
}

// Toggle to show Profile Section
showProfile(): void {
  this.showProfileSection = true;
  this.showInternshipsSection = false;
  this.showApplicationsSection = false;
}

// Toggle to show Available Internships Section
showInternships(): void {
  this.showInternshipsSection = true;
  this.showApplicationsSection = false;
  this.showProfileSection = false;
}

// Toggle to show My Applications Section
showApplications(): void {
  this.showInternshipsSection = false;
  this.showApplicationsSection = true;
  this.showProfileSection = false;
  this.getApplications();
}

// Sign out and redirect to login page
signOut(): void {
  localStorage.removeItem('token'); // Remove authentication token
  this.router.navigate(['/login']); // Redirect to login page
}

}
