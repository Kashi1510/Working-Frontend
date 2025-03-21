import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternshipService } from '../../service/internship.service';
import { ApplicationService } from '../../services/application.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  internships: any[] = [];
  applications: any[] = [];
  studentId: number;
  showInternshipsSection: boolean = true;
  showApplicationsSection: boolean = false;

  constructor(private internshipService: InternshipService, private applicationService: ApplicationService) {
    this.studentId = Number(localStorage.getItem("studentId")); // ✅ Get the logged-in student ID from localStorage
  }

  ngOnInit(): void {
    this.getInternships(); // Load internships on initial load
  }

  getInternships(): void {
    this.internshipService.getInternships().subscribe(data => {
      this.internships = data.map((internship: { company: { name: any; }; }) => ({
        ...internship,
        companyName: internship.company?.name || 'Unknown Company' // Handle cases where company might be null
      }));
    });
  }

  applyInternship(internshipId: number): void {
    if (!this.studentId) {
      alert("Student ID not found. Please log in again.");
      return;
    }

    const applicationData = {
      student: { id: this.studentId },  // ✅ Use correct student ID
      internship: { id: internshipId },
      appliedDate: new Date(),
      interviewDate: new Date()
    };

    this.applicationService.applyForInternship(applicationData).subscribe(() => {
      alert('Application submitted successfully');
      this.getApplications();
    });
  }

  getApplications(): void {
    if (!this.studentId) {
      alert("Student ID not found. Please log in again.");
      return;
    }

    this.applicationService.getApplicationsByStudent(this.studentId).subscribe((data: any[]) => {
      this.applications = data
        .filter(app => app.student?.id === this.studentId) // ✅ Filter by the logged-in student
        .map(app => ({
          id: app.id,
          internship: {
            title: app.internship?.title || "Unknown Title",
            company: {
              name: app.internship?.company?.name || "Unknown Company"
            }
          },
          appliedDate: app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : "N/A",
          status: app.status || "Pending",
          interviewDate: app.status === "Accepted" && app.appliedDate
            ? this.calculateInterviewDate(app.appliedDate)
            : "Not Scheduled"
        }));
    });
  }

  // Calculate interview date (3 days after applied date)
  calculateInterviewDate(appliedDate: string): string {
    const applied = new Date(appliedDate);
    applied.setDate(applied.getDate() + 3); // Add 3 days
    return applied.toLocaleDateString();
  }

  showInternships(): void {
    this.showInternshipsSection = true;
    this.showApplicationsSection = false;
  }

  showApplications(): void {
    this.showInternshipsSection = false;
    this.showApplicationsSection = true;
    this.getApplications(); // Fetch applications when switching to My Applications
  }
}
