import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-published-ride',
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './published-ride.component.html',
  styleUrl: './published-ride.component.css'
})
export class PublishedRideComponent implements OnInit {
  rides: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://backend-bla-bla.onrender.com/api/ride/published')  // Update this URL if needed
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

