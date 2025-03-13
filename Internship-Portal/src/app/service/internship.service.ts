import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {
  private baseUrl = 'http://localhost:8055';
  applyForInternship: any;

  constructor(private http: HttpClient) {}

  getInternships(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/internships`);
  }

  postInternship(internship: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/internships`, internship);
  }

  getApplicants(internshipId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/applicants/${internshipId}`);
  }
}