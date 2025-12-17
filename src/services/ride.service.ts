// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RideService {
//   private apiUrl = 'https://backend-bla-bla.onrender.com/api'; // Base API URL

//   constructor(private http: HttpClient) {}

//   // Method to search rides
//   searchRides(from: string, to: string, date: string | null = null, passengers: number = 1): Observable<any> {
//     let params = new HttpParams()
//       .set('from', from)
//       .set('to', to)
//       .set('passengers', passengers.toString());  // Added passengers as query parameter

//     if (date) {
//       params = params.set('date', date);  // Optional date parameter
//     }

//     return this.http.get(`${this.apiUrl}/ride/search`, { params });
//   }
//   getUserRides(userId: number) {
//     return this.http.get(`${this.apiUrl}/rides/user/${userId}`);
//   }
  
// }

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private apiUrl = 'https://backend-bla-bla.onrender.com/api'; // Base API URL

  // Store search results for frontend filtering
  private ridesCache = new BehaviorSubject<any[]>([]);
  rides$ = this.ridesCache.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Search rides from backend
   * @param from Departure location
   * @param to Destination location
   * @param date Optional ride date
   * @param passengers Number of passengers
   */
  searchRides(from: string, to: string, date: string | null = null, passengers: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('passengers', passengers.toString());

    if (date) {
      params = params.set('date', date);
    }

    return this.http.get(`${this.apiUrl}/ride/search`, { params });
  }

  /**
   * Store rides in cache for frontend filtering
   * @param rides Array of rides from search API
   */
  setRides(rides: any[]) {
    this.ridesCache.next(rides);
  }

  /**
   * Get cached rides
   */
  getRides(): any[] {
    return this.ridesCache.getValue();
  }

  /**
   * Fetch rides created by a specific user
   * @param userId User ID
   */
  getUserRides(userId: number) {
    return this.http.get(`${this.apiUrl}/rides/user/${userId}`);
  }
}






