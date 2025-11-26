import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare const google: any;

@Component({
  selector: 'app-publishride-time',
  imports: [ReactiveFormsModule],
  templateUrl: './publishride-time.component.html',
  styleUrl: './publishride-time.component.css'
})
export class PublishrideTimeComponent {

  rideForm: FormGroup;
  @ViewChild('locationInput', { static: false }) locationInput!: ElementRef;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router,private ngZone: NgZone) {
    this.rideForm = this.fb.group({
      time: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
    });
  }
user:any


ngAfterViewInit(): void {
  const autocomplete = new google.maps.places.Autocomplete(this.locationInput.nativeElement, {
    types: ['geocode'], // or use 'establishment' or ['(cities)']
  });

  autocomplete.setFields(['formatted_address', 'geometry']);

  autocomplete.addListener('place_changed', () => {
    this.ngZone.run(() => {
      const place = autocomplete.getPlace();
      console.log('Selected Address:', place.formatted_address);
      console.log('Coordinates:', place.geometry?.location?.lat(), place.geometry?.location?.lng());
    });
  });
}

















  submitRide() {
    // const userId = localStorage.getItem('userId');
  this.user = JSON.parse(localStorage.getItem('user') || '{}');   // or from auth service
  const rideData = {
    time: this.rideForm.value.time,
    date: this.rideForm.value.date,
    location: this.rideForm.value.location,
    userId: this.user.id // <-- Must be included here
  };
   
  
    this.http.post('https://backend-bla-bla.onrender.com/api/publishride/create', rideData)
    .subscribe({
      next: (res) => {
        console.log('Ride submitted', res);
        this.router.navigate(['/publish-ride']);  // Redirect to 'ride-list' page
      },
      error: (err) => {
        console.error('Submission error', err);
      }
    });
  }
  
}
