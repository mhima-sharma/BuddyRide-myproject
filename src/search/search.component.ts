import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RideService } from '../services/ride.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  selectedDate: Date | null = null;
  passengerCount = 1;
  from = '';
  to = '';
  fromResults: any[] = [];
  toResults: any[] = [];
  rides: any[] = [];
  isLoading: boolean = false;
  isSearching = false;
  

  constructor(private rideService: RideService, private http: HttpClient) {}

  @ViewChild('fromInput') fromInput!: ElementRef;
  @ViewChild('toInput') toInput!: ElementRef;

  selectedRide = {
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
  };

  ngAfterViewInit(): void {
    const fromAutocomplete = new google.maps.places.Autocomplete(
      this.fromInput.nativeElement,
      { types: ['geocode'] }
    );
    fromAutocomplete.addListener('place_changed', () => {
      const place = fromAutocomplete.getPlace();
      const address = place?.formatted_address || '';
      this.selectedRide.from = address;
      this.from = address; // ✅ Sync with this.from
    });

    const toAutocomplete = new google.maps.places.Autocomplete(
      this.toInput.nativeElement,
      { types: ['geocode'] }
    );
    toAutocomplete.addListener('place_changed', () => {
      const place = toAutocomplete.getPlace();
      const address = place?.formatted_address || '';
      this.selectedRide.to = address;
      this.to = address; // ✅ Sync with this.to
    });
  }

  increase() {
    if (this.passengerCount < 5) this.passengerCount++;
  }

  decrease() {
    if (this.passengerCount > 1) this.passengerCount--;
  }

  searchLocation(query: string, field: 'from' | 'to') {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 3) {
      if (field === 'from') this.fromResults = [];
      if (field === 'to') this.toResults = [];
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trimmedQuery)}`;
    this.http.get<any[]>(url).subscribe(
      (res) => {
        if (field === 'from') this.fromResults = res;
        else this.toResults = res;
      },
      (err) => {
        console.error(`Error searching ${field} location:`, err);
      }
    );
  }

  selectLocation(location: any, field: 'from' | 'to') {
    const selectedName = location.display_name;
    if (field === 'from') {
      this.from = selectedName;
      this.fromResults = [];
    } else {
      this.to = selectedName;
      this.toResults = [];
    }
  }

  searchRides() {
    if (!this.from.trim() || !this.to.trim()) {
      alert('Please select both departure and destination locations.');
      return;
    }
  
    const searchData = {
      from: this.from,
      to: this.to,
      date: this.selectedDate ? this.selectedDate.toString().split('T')[0] : null,
      passengers: this.passengerCount,
    };
  
    this.isSearching = true;
  
    this.rideService.searchRides(searchData.from, searchData.to, searchData.date, searchData.passengers)
      .subscribe(
        (res) => {
          // Ensure loader is shown for at least 2 seconds
          setTimeout(() => {
            this.rides = res;
            console.log('Found rides:', res);
            this.isSearching = false;
          }, 2000);
        },
        (err) => {
          console.error('Error fetching rides:', err);
          this.isSearching = false;
          alert('Something went wrong while searching for rides.');
        }
      );
  }

  //get ride details
 
  openRideDetailModal(user: any, rideId: number) {
    console.log("hhhhhiiiiiiiii")
    console.log(user,rideId,"user")
    let driverId=user.user_id
    let emailId=user.email
    window.location.href=`http://localhost:4200/ride-detail?rideId=${rideId}&driverId=${driverId}&emailId=${emailId}`;
  }
 
}  