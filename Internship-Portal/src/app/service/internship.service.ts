import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InternshipService {
  private apiUrl = 'http://localhost:8055'; // Adjust the URL to match your backend API

  constructor(private http: HttpClient) {}
  getInternship():Observable<any>  {
    return this.http.get<any>(`${this.apiUrl}/internships`);
  }
  // Get all internships
  getInternships(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/internships`);
  }

  // Post a new internship
  postInternship(internship: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/internships`, internship);
  }

  getApplicants(internshipId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/internships/${internshipId}/applicants`);
  }

  approveApplication(internshipId: number, applicationId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/internships/${internshipId}/applications/${applicationId}/approve`, {});
  }

  rejectApplication(internshipId: number, applicationId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/internships/${internshipId}/applications/${applicationId}/reject`, {});
  }
   // ✅ Send message to student
   sendMessageToStudent(studentId: number, message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${studentId}/message`, { message });
  }
  getCompanyDetails(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/internship/${companyId}`);
  }
 
}
