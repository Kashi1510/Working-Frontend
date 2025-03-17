import { Component, OnInit } from '@angular/core';
//import { InternshipsService } from '../../services/internships.service';
import { CommonModule } from '@angular/common';
import { InternshipService } from '../../service/internship.service';
import { ApplicationService } from '../../services/application.service';
import { RouterModule } from '@angular/router';
import { error } from 'node:console';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  internships: any[] = [];
  applications: any[] = [];
  studentId: number = 1; // Assume logged-in student ID

  constructor(private internshipService: InternshipService, private applicationService: ApplicationService) { }

  ngOnInit() {
    this.getInternships();
    this.getApplications();
  }

  // Fetch all internships
  getInternships() {
    this.internshipService.getInternships().subscribe(data => { this.internships = data; });
  }

  // Apply for an internship
  applyInternship(internshipId: number) {
    const applicationData = {
      student: { id: this.studentId },
      internship: { id: internshipId },
      appliedDate: new Date()
    };
    this.applicationService.applyForInternship(applicationData).subscribe(
      {
        next: (response: any) => {
          alert('Application submitted Successfully');
          this.getApplications();
        },
        error: (error) => {

          console.log(error.error);
        }
      }
    );
  }

  // Fetch student's applications
  getApplications() {

    this.applicationService.getApplicants(this.studentId).subscribe((data: any[]) => this.applications = data);
  }
}
