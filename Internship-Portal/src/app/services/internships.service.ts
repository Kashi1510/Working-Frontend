import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternshipsService {
  private apiUrl = 'http://localhost:8055';

  constructor(private http: HttpClient) {}

  getInternships(): Observable<any> {
    return this.http.get(`${this.apiUrl}/internships`);
  }
  applyInternships(application: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/applications`, application);
  }
getMyApplications(studentId: number): Observable<any>{
  return this.http.get(`${this.apiUrl}/applications/student/${studentId}`);
}
}
