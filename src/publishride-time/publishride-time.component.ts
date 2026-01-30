import {
  Component,
  ElementRef,
  ViewChild,
  NgZone,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

declare const google: any;

@Component({
  selector: 'app-publishride-time',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './publishride-time.component.html',
  styleUrl: './publishride-time.component.css'
})

export class PublishrideTimeComponent implements AfterViewInit {

  rideForm: FormGroup;
  passengerCount = 1;

  message: any;
  error = false;

  @ViewChild('pickupInput') pickupInput!: ElementRef;
  @ViewChild('dropoffInput') dropoffInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.rideForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.initAutocomplete(this.pickupInput.nativeElement, 'from');
    this.initAutocomplete(this.dropoffInput.nativeElement, 'to');
  }

  initAutocomplete(input: any, control: 'from' | 'to') {
    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['geocode']
    });

    autocomplete.setFields(['formatted_address']);

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();
        this.rideForm.get(control)?.setValue(place.formatted_address);
      });
    });
  }

  increase() {
    if (this.passengerCount < 5) this.passengerCount++;
  }

  decrease() {
    if (this.passengerCount > 1) this.passengerCount--;
  }

  publishRide() {
    if (this.rideForm.invalid) {
      this.error = true;
      this.message = 'All fields are required';
      return;
    }

    const token = localStorage.getItem('authToken');

    const data = {
      ...this.rideForm.value,
      passengers: this.passengerCount
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http
      .post('https://backend-bla-bla.onrender.com/api/ride/publish', data, { headers })
      .subscribe({
        next: () => {
          this.router.navigate(['/thanks']);
        },
        error: (err) => {
          this.error = true;
          this.message = err.error?.message || 'Something went wrong';
        }
      });
  }
}





