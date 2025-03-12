import { Component, NgModule, OnInit } from '@angular/core';
import { InternshipService } from '../../service/internship.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';



@Component({
  selector: 'app-employee-dashboard',
  imports:[CommonModule,RouterModule,FormsModule],
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit {
  internships: any[] = [];
  applicants: any[] = [];
  internship = { title: '', company: '', description: '' };
  selectedInternship: number | null = null;
 

  constructor(private internshipService: InternshipService) {}

  ngOnInit() {
   this.getInternships();
  }

  getInternships() {
    this.internshipService.getInternships().subscribe(data => {this.internships = data; console.log(this.internship)});

  }

  postInternship() {
    this.internshipService.postInternship(this.internship).subscribe(() => {
      this.getInternships();
      this.internship = { title: '', company: '', description: '' }; // Reset form
    });
  }

  getApplicants(internshipId: number) {
    this.selectedInternship = internshipId;
    this.internshipService.getApplicants(internshipId).subscribe(data => this.applicants = data);
  }
}