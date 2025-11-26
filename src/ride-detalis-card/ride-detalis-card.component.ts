import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ride-detalis-card',
  imports: [HeaderComponent, FooterComponent,ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './ride-detalis-card.component.html',
  styleUrl: './ride-detalis-card.component.css'
})
export class RideDetalisCardComponent {
// requestRide(arg0: any) {
//   this.http.post('/api/ride-requests', { rideId }).subscribe(res => {
//     alert('Ride request sent to driver.');
// }

  user:any;
rideId: any;
 


  constructor(private fb: FormBuilder, private http: HttpClient,private route: ActivatedRoute) {
  
  }
  ngOnInit(): void {
    this.updatedProfile()
  }
  updatedProfile(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('https://backend-bla-bla.onrender.com/api/auth/user/updated/profile', { headers }).subscribe({
      next: data => {
        console.log("what",data)
        this.user=data;
      },
      error: err => {
        console.error('Failed to load profile:', err);
      }
    });
  }


  requestRide() {
    this.route.queryParams.subscribe(params => {
     const rideId = params['rideId'];
     const driverId = params['driverId'];
     const emailId = params['emailId'];
     
    this.user = JSON.parse(localStorage.getItem('user') || '{}');  
    const token = localStorage.getItem('authToken');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const body = {
      rideId: rideId,
      to: emailId,
      driverId:driverId
    };
  
    this.http.post('https://backend-bla-bla.onrender.com/api/ride-requests/create', body, { headers }).subscribe(
      res => {
        alert('Ride request sent to driver.');
      },
      err => {
        console.error('Ride request failed:', err);
        alert('Failed to send ride request.');
      }
    );
  })
  }
}

