import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private apiUrl = 'http://localhost:3000/api'; // Base API URL

  constructor(private http: HttpClient) {}

  // Method to search rides
  searchRides(from: string, to: string, date: string | null = null, passengers: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('passengers', passengers.toString());  // Added passengers as query parameter

    if (date) {
      params = params.set('date', date);  // Optional date parameter
    }

    return this.http.get(`${this.apiUrl}/ride/search`, { params });
  }
  getUserRides(userId: number) {
    return this.http.get(`${this.apiUrl}/rides/user/${userId}`);
  }
  
}







