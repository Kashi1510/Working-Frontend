import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseUrl = 'http://localhost:8055/applications';

  constructor(private http: HttpClient) {}

  applyForInternship(application: any): Observable<any> {
    console.log(application);
    return this.http.post(`${this.baseUrl}/apply`, application);
  }

  getApplicationsByStudent(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/student/${studentId}`);
  }

}
