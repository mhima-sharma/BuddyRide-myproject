import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RideService } from '../services/ride.service';

@Component({
  selector: 'app-ride-detalis-card',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './ride-detalis-card.component.html',
  styleUrls: ['./ride-detalis-card.component.css']
})
export class RideDetalisCardComponent implements OnInit {

  ride: any = null;

  isProfileComplete = false;
  profileChecked = false;

  constructor(
    private route: ActivatedRoute,
    private rideService: RideService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const rideId = +params['rideId'];
      const driverId = +params['driverId'];
      const emailId = params['emailId'];

      if (!rideId || !driverId || !emailId) {
        console.error('Missing query params');
        return;
      }

      this.getRideFromCache(rideId, driverId, emailId);
    });

    this.checkProfileCompletion();
  }

  // ================= PROFILE CHECK (REUSABLE) =================
  checkProfileCompletion(callback?: (isComplete: boolean) => void): void {
    const token = localStorage.getItem('authToken');

    if (!token) {
      this.profileChecked = true;
      callback?.(false);
      return;
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );

    this.http.get<any>(
      'https://backend-bla-bla.onrender.com/api/auth/user/updated/profile',
      { headers }
    ).subscribe({
      next: (user) => {
        this.isProfileComplete =
          !!user?.address &&
          !!user?.dob &&
          !!user?.gender &&
          !!user?.phone &&
          !!user?.aadhar_file;

        this.profileChecked = true;
        callback?.(this.isProfileComplete);
      },
      error: () => {
        this.profileChecked = true;
        callback?.(false);
      }
    });
  }
  // ============================================================

  // ================= GET RIDE FROM CACHE =================
  getRideFromCache(rideId: number, driverId: number, emailId: string) {
    const rides = JSON.parse(
      localStorage.getItem('cachedRides') || '[]'
    );

    this.ride = rides.find((r: any) =>
      r.ride_id === rideId &&
      r.publisher_id === driverId &&
      r.publisher_email === emailId
    ) || null;

    if (!this.ride) {
      console.warn('Ride not found in cached data');
    }
  }
  // ======================================================

  // ================= REQUEST RIDE =================
  requestRide(): void {
    if (!this.ride) return;

    this.checkProfileCompletion((isComplete) => {

      if (!isComplete) {
        alert('Please complete your profile to continue booking');
        this.router.navigate(['/profile']);
        return;
      }

      // ✅ profile complete → booking page
      this.router.navigate(['/book'], {
        queryParams: {
          rideId: this.ride.ride_id,
          driverId: this.ride.publisher_id
        }
      });

    });
  }
  // ======================================================
}
