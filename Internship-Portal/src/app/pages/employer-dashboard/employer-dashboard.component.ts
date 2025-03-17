import { Component, OnInit } from '@angular/core';
import { InternshipService } from '../../service/internship.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-employee-dashboard',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css'],
})
export class EmployerDashboardComponent implements OnInit {
  internships: any[] = [];
  applicants: any[] = [];
  internship = { title: '', company: '', description: '' };
  selectedInternship: number | null = null;

  constructor(private internshipService: InternshipService,private applicationService:ApplicationService) {}

  ngOnInit() {
    this.getInternships();
  }

  // Fetch all internships
  getInternships() {
    this.internshipService.getInternships().subscribe((data) => {
      this.internships = data;
    });
  }

  // Post a new internship
  postInternship() {
    this.internshipService.postInternship(this.internship).subscribe(() => {
      this.getInternships();
      this.internship = { title: '', company: '', description: '' }; // Reset form
    });
  }

  // Fetch applicants for the selected internship
  getApplicants(studentId: number) {
    this.selectedInternship = studentId;
    this.applicationService.getApplicants(studentId).subscribe((data) => {
      this.applicants = data;
    });
  }

  // Approve an applicant's application
  approveApplication(applicationId: number) {
    this.internshipService.approveApplication(applicationId).subscribe(() => {
      this.getApplicants(this.selectedInternship!); // Refresh applicants
    });
  }

  // Reject an applicant's application
  rejectApplication(applicationId: number) {
    this.internshipService.rejectApplication(applicationId).subscribe(() => {
      this.getApplicants(this.selectedInternship!); // Refresh applicants
    });
  }
}
