import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private apiUrl = 'https://backend-bla-bla.onrender.com/api/rides'; // Adjust if hosted

  constructor(private http: HttpClient) { }

  requestRide(ride_id: number, passenger_id: number, driver_id: number) {
    return this.http.post(`${this.apiUrl}/request`, {
      ride_id,
      passenger_id,
      driver_id
    });
  }

  getRequestStatus(requestId: number) {
    return this.http.get(`${this.apiUrl}/status/${requestId}`);
  }
}
