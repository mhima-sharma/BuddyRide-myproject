import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publish-rides',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publish-rides.component.html',
  styleUrl: './publish-rides.component.css'
})
export class PublishRidesComponent implements OnInit {

  rides: any[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPublishedRides();
  }

  getPublishedRides(): void {
    this.http
      .get<any[]>('https://backend-bla-bla.onrender.com/api/ride/published')
      .subscribe({
        next: (res) => {
          this.rides = res || [];
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load published rides';
          this.loading = false;
        }
      });
  }
}
