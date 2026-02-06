import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  notifications: any[] = [];
  loading = false;
   rides: any[] = [];

  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  // 🔔 Load latest notifications
  loadNotifications() {
    this.loading = true;

    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    Promise.all([
      this.http.get<any>(
        `https://backend-bla-bla.onrender.com/api/bookings/rider/${this.user.id}`,
        { headers }
      ).toPromise(),

      this.http.get<any>(
        `https://backend-bla-bla.onrender.com/api/bookings/driver/${this.user.id}`,
        { headers }
      ).toPromise()

    ]).then(([riderRes, driverRes]) => {

      const allNotifications = [
        ...(riderRes?.data || riderRes || []),
        ...(driverRes?.data || driverRes || [])
      ];

      // 🆕 Sort by latest & keep only 4
      this.notifications = allNotifications
        .sort((a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 4);

      this.loading = false;

    }).catch(err => {
      console.error('Notification load failed', err);
      this.loading = false;
    });
  }
}
