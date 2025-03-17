import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InternshipService {
  private apiUrl = 'http://localhost:8055'; // Adjust the URL to match your backend API

  constructor(private http: HttpClient) {}

  // Get all internships
  getInternships(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/internships`);
  }

  // Post a new internship
  postInternship(internship: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/internships`, internship);
  }

  // Get applicants for a specific internship
  getApplicants(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/applications/student/${studentId}`);
  }

  // Approve an applicant's application
  approveApplication(applicationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/applications/approve/${applicationId}`, {});
  }

  // Reject an applicant's application
  rejectApplication(applicationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/applications/reject/${applicationId}`, {});
  }
}
