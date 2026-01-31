import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-book-ride',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './book-ride.component.html',
  styleUrl: './book-ride.component.css'
})
export class BookRideComponent implements OnInit {

  ride: any = null;
  rider: any = null;
  loading: boolean = false;

  // 🔹 Map iframe
  mapUrl!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Logged-in user (rider)
    this.rider = JSON.parse(localStorage.getItem('user') || '{}');

    this.route.queryParams.subscribe(params => {
      const rideId = params['rideId'];
      if (rideId) {
        this.loadRideDetails(+rideId);
      }
    });
  }

  // ================= LOAD RIDE =================
  loadRideDetails(rideId: number) {
    const rides = JSON.parse(localStorage.getItem('cachedRides') || '[]');

    this.ride = rides.find((r: any) => r.ride_id === rideId);

    if (!this.ride) {
      alert('Ride not found');
      this.router.navigate(['/home']);
      return;
    }

    this.generateMapIframe();
  }

  // ================= MAP IFRAME =================
  generateMapIframe() {
    const from = encodeURIComponent(this.ride.from_location);
    const to = encodeURIComponent(this.ride.to_location);

    const url = `https://www.openstreetmap.org/export/embed.html?search=${from}%20to%20${to}&layer=mapnik`;

    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // ================= CONFIRM BOOKING =================
  confirmBooking() {
    if (!this.ride || !this.rider?.id) return;

    this.loading = true;

    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );

    const body = {
  ride_id: this.ride.ride_id,
  driver_id: this.ride.publisher_id,
  rider_id: this.rider.id,
  from_location: this.ride.from_location,
  to_location: this.ride.to_location,
  date: this.ride.date,
  time: this.ride.time,
  price: this.ride.location_price || 0,
  status: 'pending',
  rider_name: this.rider.name,
  rider_email: this.rider.email,
  driver_email: this.ride.publisher_email
};


    this.http.post(
      'https://backend-bla-bla.onrender.com/api/bookings/create',
      body,
      { headers }
    ).subscribe({
      next: () => {
        alert('Booking request sent successfully');
        this.router.navigate(['/my-bookings']);
      },
      error: () => {
        alert('Failed to create bookingyyyyy');
        this.loading = false;
      }
    });
  }
}
