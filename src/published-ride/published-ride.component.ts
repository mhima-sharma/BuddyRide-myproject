import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-published-ride',
  imports: [CommonModule,RouterLink],
  templateUrl: './published-ride.component.html',
  styleUrl: './published-ride.component.css'
})
export class PublishedRideComponent implements OnInit {
  rides: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/ride/published')  // Update this URL if needed
      .subscribe({
        next: (data) => {
          this.rides = data;
        },
        error: (err) => {
          console.error('Error fetching rides:', err);
        }
      });
  }
  }

