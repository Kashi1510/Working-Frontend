import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8055';

  constructor(private http: HttpClient) {}

  getStudentById(studentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/register/${studentId}`);
  }
}
