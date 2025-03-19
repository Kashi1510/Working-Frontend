import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseUrl = 'http://localhost:8055/applications';
 
  // getApplicants: any;

  constructor(private http: HttpClient) {}

  applyForInternship(applicationData: any): Observable<any> {
    console.log(applicationData);
    return this.http.post(`${this.baseUrl}/apply`, applicationData);
  }

  getApplicationsByStudent(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/student/${studentId}`);
  }
   


}
