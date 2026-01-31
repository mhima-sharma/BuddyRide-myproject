import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-rides',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './user-rides.component.html',
  styleUrl: './user-rides.component.css'
})
export class UserRidesComponent implements OnInit {

  activeTab: 'all' | 'my' | 'driver' = 'my'; // default to "My Bookings"
  rides: any[] = [];
  loading = false;

  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRides();
  }

  // Switch tabs
  changeTab(tab: 'all' | 'my' | 'driver') {
    this.activeTab = tab;
    this.loadRides();
  }

  // Load rides based on active tab
  loadRides() {
    this.loading = true;
    let url = '';

    if (this.activeTab === 'all') {
      url = 'https://backend-bla-bla.onrender.com/api/rides/all';
    }
    if (this.activeTab === 'my') {
      url = `https://backend-bla-bla.onrender.com/api/bookings/rider/${this.user.id}`;
    }
    if (this.activeTab === 'driver') {
      url = `https://backend-bla-bla.onrender.com/api/bookings/driver/${this.user.id}`;
    }

    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(url, { headers }).subscribe({
      next: (res) => {
        this.rides = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Update ride status (accept/reject) — driver tab only
  updateStatus(bookingId: number, status: 'accepted' | 'rejected') {
    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(
      `https://backend-bla-bla.onrender.com/api/bookings/update-status/${bookingId}`,
      { status },
      { headers }
    ).subscribe({
      next: () => {
        // Update status locally for instant UI update
        const ride = this.rides.find(r => r.id === bookingId);
        if (ride) ride.status = status;
      },
      error: (err) => {
        console.error('Failed to update status', err);
      }
    });
  }
}
