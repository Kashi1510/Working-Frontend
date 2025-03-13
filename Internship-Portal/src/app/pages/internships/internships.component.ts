import { Component } from '@angular/core';
// import { InternshipService } from '../../service/internship.service';
// import { CommonModule } from '@angular/common';
// import { InternshipsService } from '../../services/internships.service';

@Component({
  selector: 'app-internships',
  imports: [],
  templateUrl: './internships.component.html',
  styleUrl: './internships.component.css'
})
export class InternshipsComponent  {
  // internships: any[] = [];

  // constructor(private internshipsService: InternshipsService) {}

  // ngOnInit() {
  //   this.internshipsService.getInternships().subscribe(data => {
  //     this.internships = data;
  //   });
  // }

  // apply(id: number) {
  //   const email = 'student@example.com';
  //   this.internshipsService.applyForInternship(id, email).subscribe((response) => {
  //     alert(response);
  //   }, (error: any) => {
  //     console.error(error);
  //     alert('Something went wrong, please try again.');
  //   });
  // }

}
