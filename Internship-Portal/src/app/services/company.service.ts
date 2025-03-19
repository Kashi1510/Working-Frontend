import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Provides this service throughout the app
})
export class CompanyService {
  private apiUrl = 'http://localhost:8055/internship'; // ✅ Adjust this URL based on your backend

  constructor(private http: HttpClient) {}

  //  Register a new company (Send data to backend)
  registerCompany(companyData: any): Observable<any> {
    return this.http.post(this.apiUrl, companyData);
  }
  getCompanyByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${email}`);
  }
}