import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RideService } from '../services/ride.service';

@Component({
  selector: 'app-ride-detalis-card',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './ride-detalis-card.component.html',
  styleUrls: ['./ride-detalis-card.component.css']
})  
export class RideDetalisCardComponent implements OnInit {
  ride: any;

  constructor(private route: ActivatedRoute, private rideService: RideService, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const rideId = params['rideId'];
      const driverId = params['driverId'];
      const emailId = params['emailId'];

      if (!rideId || !driverId || !emailId) {
        console.error('Missing query params');
        return;
      }

      this.getRideFromCache(+rideId, +driverId, emailId);
    });
  }

  /**
   * Get ride details from RideService cache instead of backend
   */
  // getRideFromCache(rideId: number, driverId: number, emailId: string) {
  //   const rides = this.rideService.getRides();
  //   const foundRide = rides.find(r =>
  //     r.ride_id === rideId &&
  //     r.publisher_id === driverId &&
  //     r.publisher_email === emailId
  //   );

  //   if (foundRide) {
  //     this.ride = foundRide;
  //     console.log('Ride Details (from cache):', this.ride);
  //   } else {
  //     console.warn('Ride not found in cached search results.');
  //     this.ride = null; // optional: show a "Ride not found" message in UI
  //   }
  // }
getRideFromCache(rideId: number, driverId: number, emailId: string) {
  // Parse cached rides safely; default to empty array if null
  const rides = JSON.parse(localStorage.getItem('cachedRides') || '[]') as any[];

  // Now rides is always an array
  const foundRide = rides.find(r =>
    r.ride_id === rideId &&
    r.publisher_id === driverId &&
    r.publisher_email === emailId
  );

  if (foundRide) {
    this.ride = foundRide;
    console.log('Ride Details (from cache):', this.ride);
  } else {
    console.warn('Ride not found in cached search results.');
    this.ride = null; // optional: show a "Ride not found" message in UI
  }
}


  /**
   * Send ride request
   */
  requestRide() {
    if (!this.ride) return;

    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      rideId: this.ride.ride_id,
      driverId: this.ride.publisher_id,
      to: this.ride.publisher_email
    };

    this.http.post(
      'https://backend-bla-bla.onrender.com/api/ride-requests/create',
      body,
      { headers }
    ).subscribe({
      next: () => alert('Ride request sent to driver.'),
      error: () => alert('Failed to send ride request.')
    });
  }
}
