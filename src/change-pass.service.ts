import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePassService {
  baseUrl="http://localhost:3000"

  constructor(private http: HttpClient) { }
  changePassword(data: { currentPassword: string, newPassword: string }) {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error('No auth token found.');
      return throwError(() => new Error('Unauthorized'));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.baseUrl}/api/auth/change-password`, data, { headers });
  }
  
}
