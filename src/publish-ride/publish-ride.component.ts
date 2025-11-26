import {  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  AfterViewInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
declare const google: any;
@Component({
  selector: 'app-publish-ride',
  imports: [HeaderComponent, CommonModule, FormsModule, FooterComponent],
  templateUrl: './publish-ride.component.html',
  styleUrl: './publish-ride.component.css'
})
export class PublishRideComponent {
  passengerCount = 1;
  field1: string = '';
  field2: string = '';

  fromResults: any[] = [];
  toResults: any[] = [];


@ViewChild('locationInput', { static: false }) locationInput!: ElementRef;
@ViewChild('dropoffInput', { static: false }) dropoffInput!: ElementRef;

  constructor(private http: HttpClient ,private router: Router,private ngZone: NgZone) {}

// auto complete location
ngAfterViewInit(): void {
  console.log(this.locationInput,"this.locationInput")
  this.initAutocomplete(this.locationInput?.nativeElement, 'pickup');
  this.initAutocomplete(this.dropoffInput?.nativeElement, 'dropoff');
}

initAutocomplete(inputElement: any, type: 'pickup' | 'dropoff') {
  const autocomplete = new google.maps.places.Autocomplete(inputElement, {
    types: ['geocode']
  });

  autocomplete.setFields(['formatted_address', 'geometry']);

  autocomplete.addListener('place_changed', () => {
    this.ngZone.run(() => {
      const place = autocomplete.getPlace();
      const address = place.formatted_address;

      if (type === 'pickup') {
        this.field1 = address;
      } else {
        this.field2 = address;
      }

      console.log(`${type} address:`, address);
      console.log('Coordinates:', place.geometry?.location?.lat(), place.geometry?.location?.lng());
    });
  });
}





























  // Switch values
  switchValues() {
    const temp = this.field1;
    this.field1 = this.field2;
    this.field2 = temp;
  }

  // Increase passenger
  increase() {
    if (this.passengerCount < 5) {
      this.passengerCount++;
    }
  }

  // Decrease passenger
  decrease() {
    if (this.passengerCount > 1) {
      this.passengerCount--;
    }
  }

  // Search location using OpenStreetMap
  searchLocation(query: string, type: 'from' | 'to') {
    if (!query) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    this.http.get<any[]>(url).subscribe((res) => {
      if (type === 'from') {
        this.fromResults = res;
      } else if (type === 'to') {
        this.toResults = res;
      }
    });
  }
  message:any;
  error=false;
  openPickupLocation() {
    if(this.field1 !='' &&  this.field2 !=''){
    this.router.navigate(['/pick-up']);
    this.error=false;
    }else{
   this.message="Both fields are requried";
   this.error=true;
    }
    
  }
  // Select location from dropdown
  selectLocation(loc: any, type: 'from' | 'to') {
    if (type === 'from') {
      this.field1 = loc.display_name;
      this.fromResults = [];
    } else if (type === 'to') {
      this.field2 = loc.display_name;
      this.toResults = [];
    }
  }

  // Ride publish logic
  publishRide() {
    const data = {
      from: this.field1,
      to: this.field2,
      passengers: this.passengerCount
    };

    const token = localStorage.getItem('authToken'); // JWT token saved after login/signup
    console.log("kya yha token arha h ", token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post('https://backend-bla-bla.onrender.com/api/ride/publish', data, { headers })
      .subscribe({
        next: (res: any) => {
          console.log('Ride published successfully', res);
          alert('Ride published!');
          this.router.navigate(['/thanks']);
        },
        error: (err: any) => {
          console.error('Error publishing ride:', err);
          alert(err.error.message || 'Error occurred');
        }
      });
  }


  
}
