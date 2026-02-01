import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Ride {
  ride_id: number;
  driver_id: number;
  rider_id: number;
  from_location: string;
  to_location: string;
  date: string;
  time: string;
  price: number;
  status: string;
  created_at: string;
  updated_at: string;
  seats_booked: number;
  price_per_seat?: number;
  total_amount?: number;
  rider_email?: string;
}

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent implements OnInit {
  rides: Ride[] = [];
  filteredRides: Ride[] = [];
  searchText: string = '';
  loading: boolean = false;

  private url = 'https://backend-bla-bla.onrender.com/api/rides/all';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRides();
  }

  // Fetch all rides from API
  fetchRides() {
    this.loading = true;

    this.http.get<any>(this.url).subscribe({
      next: (res) => {
        // API usually returns { success: true, data: [...] }
        this.rides = res.data || [];
        this.filteredRides = [...this.rides];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching rides:', err);
        this.loading = false;
      }
    });
  }

  // Filter rides based on search input
  searchRides() {
    const text = this.searchText.toLowerCase();
    this.filteredRides = this.rides.filter(ride =>
      Object.values(ride).some(val =>
        String(val).toLowerCase().includes(text)
      )
    );
  }
}
