import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface ApiResponse { message: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
   private baseUrl = 'https://backend-bla-bla.onrender.com/api';

  constructor( private http: HttpClient) { }


  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
  
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  forgotPassword(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/auth/forgot-password`, { email });
  }

   resetPassword(token: string, newPassword: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/auth/reset-password`, { token, newPassword });
  }


}
