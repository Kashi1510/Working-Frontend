import { Component, OnInit } from '@angular/core';
import { InternshipService } from '../../service/internship.service';
import { ApplicationService } from '../../services/application.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employer-dashboard',
  imports:[CommonModule,FormsModule,RouterModule],
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css'],
})
export class EmployerDashboardComponent implements OnInit {
  internships: any[] = [];
  applicants: any[] = [];
  internship = { title: '', companyName: '', description: '' };
  selectedInternshipId: number | null = null;

  constructor(
    private internshipService: InternshipService,
    private applicationService: ApplicationService
  ) {}

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
      this.internship = { title: '', companyName: '', description: '' };
    });
  }

  // Get applicants for the selected internship
  getApplicants(internshipId: number) {
    this.selectedInternshipId = internshipId;
    this.internshipService.getApplicants(internshipId).subscribe((data) => {
      this.applicants = data;
    });
  }

  // Approve applicant
  approveApplication(applicationId: number) {
    this.internshipService.approveApplication(this.selectedInternshipId!, applicationId).subscribe(() => {
      this.getApplicants(this.selectedInternshipId!);
    });
  }

  // Reject applicant
  rejectApplication(applicationId: number) {
    this.internshipService.rejectApplication(this.selectedInternshipId!, applicationId).subscribe(() => {
      this.getApplicants(this.selectedInternshipId!);
    });
  }
}
