import { Component, OnInit } from '@angular/core';
import { InternshipService } from '../../service/internship.service';
import { ApplicationService } from '../../services/application.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-employer-dashboard',
  imports:[CommonModule,FormsModule,RouterModule],
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css'],
})
export class EmployerDashboardComponent implements OnInit {
  showProfile: boolean = false;
showPostInternship: boolean = false;
showInternships: boolean = false;
showApplicants: boolean = false;

companyDetails: any = {};
internships: any[] = [];
applicants: any[] = [];
selectedInternshipId: number | null = null;
internship = { title: '', companyName: '', description: '', role: '' };

constructor(
  private internshipService: InternshipService,
  private applicationService: ApplicationService
) {}

ngOnInit() {}

// Toggle Profile Section
toggleProfile() {
  this.showProfile = !this.showProfile;
  if (this.showProfile) {
    this.getCompanyProfile();
  }
}

// Fetch company details
getCompanyProfile() {
  const companyId = 1; // Replace with actual logged-in employer ID
  const internshipData = { 
    ...this.internship, 
    companyId: companyId 
  };
  this.internshipService.postInternship(internshipData).subscribe(() => {
    this.getInternships(); // Refresh internship list after posting
    this.internship = { title: '', companyName: '', description: '', role: '' };
  });
      
  
}

// Toggle Internship Posting Form
togglePostInternship() {
  this.showPostInternship = !this.showPostInternship;
}

// Post a new internship
postInternship() {
  const companyId = 1;

  this.internshipService.postInternship(this.internship).subscribe(() => {
    this.getInternships();
    this.internship = { title: '', companyName: '', description: '', role: '' };
  });
}

// Toggle Internships List
toggleInternships() {
  this.showInternships = !this.showInternships;
  if (this.showInternships) {
    this.getInternships();
  }
}

// Fetch all internships
getInternships() {
  this.internshipService.getInternships().subscribe((data) => {
    this.internships = data;
   
  });
}

// Toggle Applicants List
getApplicants(internshipId: number) {
  this.selectedInternshipId = internshipId;
  this.showApplicants = true;
  this.internshipService.getApplicants(internshipId).subscribe((data) => {
    this.applicants = data;
  });
}

// Approve an applicant
approveApplication(applicationId: number) {
  this.internshipService.approveApplication(this.selectedInternshipId!, applicationId).subscribe(() => {
    this.getApplicants(this.selectedInternshipId!);
  });
}

// Reject an applicant
rejectApplication(applicationId: number) {
  this.internshipService.rejectApplication(this.selectedInternshipId!, applicationId).subscribe(() => {
    this.getApplicants(this.selectedInternshipId!);
  });
}

}