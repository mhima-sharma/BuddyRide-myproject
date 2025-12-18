// import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { RideService } from '../services/ride.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';

// declare const google: any;

// @Component({
//   selector: 'app-search',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css']
// })
// export class SearchComponent implements AfterViewInit {
//   selectedDate: Date | null = null;
//   passengerCount = 1;
//   from = '';
//   to = '';
//   fromResults: any[] = [];
//   toResults: any[] = [];
//   rides: any[] = [];
//   isLoading: boolean = false;
//   isSearching = false;

//   @ViewChild('fromInput') fromInput!: ElementRef;
//   @ViewChild('toInput') toInput!: ElementRef;

//   selectedRide = {
//     from: '',
//     to: '',
//     date: new Date().toISOString().split('T')[0],
//   };

//   constructor(private rideService: RideService, private http: HttpClient) {}

//   ngAfterViewInit(): void {
//     // Google Places Autocomplete for 'from'
//     const fromAutocomplete = new google.maps.places.Autocomplete(
//       this.fromInput.nativeElement,
//       { types: ['geocode'] }
//     );
//     fromAutocomplete.addListener('place_changed', () => {
//       const place = fromAutocomplete.getPlace();
//       const address = place?.formatted_address || '';
//       this.selectedRide.from = address;
//       this.from = address;
//     });

//     // Google Places Autocomplete for 'to'
//     const toAutocomplete = new google.maps.places.Autocomplete(
//       this.toInput.nativeElement,
//       { types: ['geocode'] }
//     );
//     toAutocomplete.addListener('place_changed', () => {
//       const place = toAutocomplete.getPlace();
//       const address = place?.formatted_address || '';
//       this.selectedRide.to = address;
//       this.to = address;
//     });
//   }

//   increase() {
//     if (this.passengerCount < 5) this.passengerCount++;
//   }

//   decrease() {
//     if (this.passengerCount > 1) this.passengerCount--;
//   }

//   searchLocation(query: string, field: 'from' | 'to') {
//     const trimmedQuery = query.trim();
//     if (trimmedQuery.length < 3) {
//       if (field === 'from') this.fromResults = [];
//       if (field === 'to') this.toResults = [];
//       return;
//     }

//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trimmedQuery)}`;
//     this.http.get<any[]>(url).subscribe(
//       res => field === 'from' ? this.fromResults = res : this.toResults = res,
//       err => console.error(`Error searching ${field} location:`, err)
//     );
//   }

//   selectLocation(location: any, field: 'from' | 'to') {
//     const selectedName = location.display_name;
//     if (field === 'from') {
//       this.from = selectedName;
//       this.fromResults = [];
//     } else {
//       this.to = selectedName;
//       this.toResults = [];
//     }
//   }

//   searchRides() {
//     if (!this.from.trim() || !this.to.trim()) {
//       alert('Please select both departure and destination locations.');
//       return;
//     }

//     const searchData = {
//       from: this.from,
//       to: this.to,
//       date: this.selectedDate ? this.selectedDate.toISOString().split('T')[0] : null,
//       passengers: this.passengerCount
//     };

//     this.isSearching = true;

//     this.rideService.searchRides(searchData.from, searchData.to, searchData.date, searchData.passengers)
//       .subscribe(
//         res => {
//           setTimeout(() => {
//             this.rides = res;
//             this.rideService.setRides(res); // ✅ Store rides in shared service for frontend filtering
//             console.log('Found rides:', res);
//             this.isSearching = false;
//           }, 2000); // minimum loader time
//         },
//         err => {
//           console.error('Error fetching rides:', err);
//           this.isSearching = false;
//           alert('Something went wrong while searching for rides.');
//         }
//       );
//   }

//   // openRideDetailModal(ride: any) {
//   //   const rideId = ride.ride_id;
//   //   const driverId = ride.publisher_id;
//   //   const emailId = ride.publisher_email;

//   //   // Navigate to ride-detail page with query params
//   //   window.location.href = `http://localhost:4200/ride-detail?rideId=${rideId}&driverId=${driverId}&emailId=${emailId}`;
//   // }
//   openRideDetailModal(ride: any) {
//   localStorage.setItem('cachedRides', JSON.stringify(this.rides));
//   window.location.href = `http://localhost:4200/ride-detail?rideId=${ride.ride_id}&driverId=${ride.publisher_id}&emailId=${ride.publisher_email}`;
// }

// }
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RideService } from '../services/ride.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const google: any;

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {

  selectedDate: Date | null = null;
  passengerCount = 1;
  from = '';
  to = '';
  rides: any[] = [];
  isSearching = false;

  @ViewChild('fromInput', { static: false }) fromInput!: ElementRef;
  @ViewChild('toInput', { static: false }) toInput!: ElementRef;

  constructor(private rideService: RideService, private http: HttpClient) {}

  ngAfterViewInit(): void {
    // ✅ SAFE GOOGLE CHECK (NO TYPE ERROR)
    if (!this.fromInput || !this.toInput || typeof google === 'undefined') {
      console.warn('Google Maps not loaded yet');
      return;
    }

    const fromAutocomplete = new google.maps.places.Autocomplete(
      this.fromInput.nativeElement,
      { types: ['geocode'] }
    );

    fromAutocomplete.addListener('place_changed', () => {
      const place = fromAutocomplete.getPlace();
      this.from = place?.formatted_address || '';
    });

    const toAutocomplete = new google.maps.places.Autocomplete(
      this.toInput.nativeElement,
      { types: ['geocode'] }
    );

    toAutocomplete.addListener('place_changed', () => {
      const place = toAutocomplete.getPlace();
      this.to = place?.formatted_address || '';
    });
  }

  increase() {
    if (this.passengerCount < 5) this.passengerCount++;
  }

  decrease() {
    if (this.passengerCount > 1) this.passengerCount--;
  }

  searchRides() {
    if (!this.from.trim() || !this.to.trim()) {
      alert('Please select both departure and destination locations.');
      return;
    }

    this.isSearching = true;

    const date =
      this.selectedDate instanceof Date
        ? this.selectedDate.toISOString().split('T')[0]
        : this.selectedDate;

    this.rideService
      .searchRides(this.from, this.to, date, this.passengerCount)
      .subscribe({
        next: res => {
          setTimeout(() => {
            this.rides = res;
            this.rideService.setRides(res);
            this.isSearching = false;
          }, 2000);
        },
        error: err => {
          console.error(err);
          this.isSearching = false;
          alert('Something went wrong while searching for rides.');
        }
      });
  }

  openRideDetailModal(ride: any) {
  localStorage.setItem('cachedRides', JSON.stringify(this.rides));

  const baseUrl = window.location.origin;

  window.location.href =
    `${baseUrl}/ride-detail?rideId=${ride.ride_id}&driverId=${ride.publisher_id}&emailId=${ride.publisher_email}`;
}
}
