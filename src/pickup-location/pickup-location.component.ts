// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import {
//   Component,
//   ElementRef,
//   NgZone,
//   OnInit,
//   ViewChild,
//   AfterViewInit
// } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HeaderComponent } from "../header/header.component";
// import { FooterComponent } from "../footer/footer.component";

// declare var google: any;

// @Component({
//   selector: 'app-pickup-location',
//   standalone: true,
//   imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
//   templateUrl: './pickup-location.component.html',
//   styleUrls: ['./pickup-location.component.css']
// })
// export class PickupLocationComponent implements OnInit, AfterViewInit {

//   map: any;
//   directionsService: any;
//   directionsRenderer: any;

//   pickupAddress: string = '';
//   dropoffAddress: string = '';
//   customStop: string = '';

//   routes: any[] = [];
//   selectedRouteIndex: number = -1;
//   selectedRoute: any = null;

//   stepMarkers: any[] = [];
//   stopPoints: any[] = [];
//   selectedStop: any = { id: null };

//   user: any;

//   @ViewChild('locationInput', { static: false }) locationInput!: ElementRef;
//   @ViewChild('DropoffInput', { static: false }) dropoffInput!: ElementRef;

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private ngZone: NgZone
//   ) {}

//   // ================= PROFILE CHECK (ADDED SAFELY) =================
//   checkProfileCompletion(): void {
//     this.http
//       .get<any>('https://backend-bla-bla.onrender.com/api/auth/user/updated/profile')
//       .subscribe({
//         next: (user) => {
//           const isProfileComplete =
//             user?.address &&
//             user?.dob &&
//             user?.gender &&
//             user?.phone &&
//             user?.vehicles &&
//             user?.aadhar_file; // driving_license_file is ignored

//           if (!isProfileComplete) {
//             alert('Please complete your profile before publishing a ride');
//             this.router.navigate(['/update-profile']);
//           }
//         },
//         error: () => {
//           alert('Unable to verify profile. Please login again.');
//           this.router.navigate(['/profile']);
//         }
//       });
//   }
//   // ================================================================

//   ngOnInit(): void {
//     this.checkProfileCompletion(); // ✅ profile check
//     this.directionsService = new google.maps.DirectionsService();
//   }

//   ngAfterViewInit(): void {
//     this.initMap();
//     this.initAutocomplete(this.locationInput.nativeElement, 'pickup');
//     this.initAutocomplete(this.dropoffInput.nativeElement, 'dropoff');
//   }

//   initAutocomplete(inputElement: any, type: 'pickup' | 'dropoff') {
//     const autocomplete = new google.maps.places.Autocomplete(inputElement, {
//       types: ['geocode']
//     });

//     autocomplete.setFields(['formatted_address', 'geometry']);

//     autocomplete.addListener('place_changed', () => {
//       this.ngZone.run(() => {
//         const place = autocomplete.getPlace();
//         const address = place.formatted_address;

//         if (type === 'pickup') {
//           this.pickupAddress = address;
//         } else {
//           this.dropoffAddress = address;
//         }
//       });
//     });
//   }

//   initMap(): void {
//     const mapElement = document.getElementById('map');
//     if (mapElement) {
//       this.map = new google.maps.Map(mapElement, {
//         center: { lat: 28.6139, lng: 77.2090 },
//         zoom: 13
//       });

//       this.directionsRenderer = new google.maps.DirectionsRenderer({
//         map: this.map,
//         suppressMarkers: false
//       });
//     }
//   }

//   geocodeAddress(address: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//       const geocoder = new google.maps.Geocoder();
//       geocoder.geocode({ address }, (results: any, status: any) => {
//         if (status === 'OK') {
//           resolve(results[0].geometry.location);
//         } else {
//           reject('Address not found');
//         }
//       });
//     });
//   }

//   async calculateRoute(): Promise<void> {
//     try {
//       const pickupLocation = await this.geocodeAddress(this.pickupAddress);
//       const dropoffLocation = await this.geocodeAddress(this.dropoffAddress);
//       this.getAllRoutes(pickupLocation, dropoffLocation);
//     } catch (error) {
//       alert('Error calculating route');
//     }
//   }

//   getAllRoutes(pickupLocation: any, dropoffLocation: any): void {
//     const request = {
//       origin: pickupLocation,
//       destination: dropoffLocation,
//       travelMode: google.maps.TravelMode.DRIVING,
//       provideRouteAlternatives: true
//     };

//     this.directionsService.route(request, (result: any, status: any) => {
//       if (status === 'OK') {
//         this.routes = result.routes;
//         this.selectedRouteIndex = -1;
//         this.directionsRenderer.setDirections(result);
//       }
//     });
//   }

//   selectRoute(index: number): void {
//     this.selectedRouteIndex = index;
//     this.selectedRoute = this.routes[index];

//     const selectedResult = {
//       geocoded_waypoints: [],
//       routes: [this.selectedRoute],
//       request: {}
//     };

//     this.directionsRenderer.setDirections(selectedResult);
//     this.clearStepMarkers();
//     this.showStopPoints(this.selectedRoute);
//   }

//   clearStepMarkers(): void {
//     this.stepMarkers.forEach(marker => marker.setMap(null));
//     this.stepMarkers = [];
//     this.stopPoints = [];
//   }

//   showStopPoints(route: any): void {
//     const steps = route.legs[0].steps;

//     steps.forEach((step: any, i: number) => {
//       const marker = new google.maps.Marker({
//         position: step.start_location,
//         map: this.map,
//         label: `${i + 1}`
//       });

//       this.stepMarkers.push(marker);

//       this.stopPoints.push({
//         id: i,
//         instruction: step.instructions.replace(/<[^>]+>/g, ''),
//         location: step.start_location
//       });
//     });
//   }

//   selectStop(stop: any): void {
//     this.selectedStop = stop;
//     this.addStopToRoute();
//   }

//   addStopToRoute(): void {
//     if (!this.selectedStop) return;

//     const request = {
//       origin: this.selectedRoute.legs[0].start_location,
//       destination: this.selectedRoute.legs[0].end_location,
//       waypoints: [{ location: this.selectedStop.location, stopover: true }],
//       travelMode: google.maps.TravelMode.DRIVING
//     };

//     this.directionsService.route(request, (result: any, status: any) => {
//       if (status === 'OK') {
//         this.directionsRenderer.setDirections(result);
//       }
//     });
//   }

//   addCustomStop(): void {
//     if (!this.customStop) return;

//     this.stopPoints.push({
//       id: this.stopPoints.length,
//       instruction: this.customStop,
//       location: null
//     });

//     this.customStop = '';
//   }

//   saveStopPoint(): void {
//     this.user = JSON.parse(localStorage.getItem('user') || '{}');

//     const stopData = {
//       instruction: this.selectedStop?.instruction || this.customStop,
//       user_id: this.user.id,
//       lat: 20.593683,
//       lng: 78.962883
//     };

//     this.http.post('https://backend-bla-bla.onrender.com/api/user/stop', stopData)
//       .subscribe({
//         next: () => this.router.navigate(['/calander']),
//         error: () => alert('Error saving stop point!')
//       });
//   }
// }
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

declare var google: any;

@Component({
  selector: 'app-pickup-location',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './pickup-location.component.html',
  styleUrls: ['./pickup-location.component.css']
})
export class PickupLocationComponent implements OnInit, AfterViewInit {

  map: any;
  directionsService: any;
  directionsRenderer: any;

  pickupAddress = '';
  dropoffAddress = '';
  customStop = '';

  routes: any[] = [];
  selectedRouteIndex = -1;
  selectedRoute: any = null;

  stepMarkers: any[] = [];
  stopPoints: any[] = [];
  selectedStop: any = { id: null };

  user: any;

  // 🔴 NEW FLAGS (SAFE)
  isProfileComplete: boolean = true;
  profileErrorMessage: string = '';

  @ViewChild('locationInput') locationInput!: ElementRef;
  @ViewChild('DropoffInput') dropoffInput!: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  // ✅ PROFILE CHECK (NO ALERT, NO REDIRECT)
  checkProfileCompletion(): void {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      this.isProfileComplete = false;
      return;
    }
  
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
  
    this.http
      .get<any>(
        'https://backend-bla-bla.onrender.com/api/auth/user/updated/profile',
        { headers }
      )
      .subscribe({
        next: (user) => {
          const complete =
            !!user?.address &&
            !!user?.dob &&
            !!user?.gender &&
            !!user?.phone &&
            !!user?.aadhar_file;
  
          this.isProfileComplete = complete;
        },
        error: (err) => {
          console.error('Profile check failed:', err);
          this.isProfileComplete = false;
        }
      });
  }
  

  ngOnInit(): void {
    this.checkProfileCompletion();
    this.directionsService = new google.maps.DirectionsService();
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initAutocomplete(this.locationInput.nativeElement, 'pickup');
    this.initAutocomplete(this.dropoffInput.nativeElement, 'dropoff');
  }

  initAutocomplete(input: any, type: 'pickup' | 'dropoff') {
    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['geocode']
    });

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();
        if (type === 'pickup') this.pickupAddress = place.formatted_address;
        else this.dropoffAddress = place.formatted_address;
      });
    });
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 28.6139, lng: 77.2090 },
      zoom: 13
    });

    this.directionsRenderer = new google.maps.DirectionsRenderer({ map: this.map });
  }

  async calculateRoute() {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: this.pickupAddress }, (pickupRes: any) => {
      geocoder.geocode({ address: this.dropoffAddress }, (dropRes: any) => {
        this.directionsService.route({
          origin: pickupRes[0].geometry.location,
          destination: dropRes[0].geometry.location,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true
        }, (result: any) => {
          this.routes = result.routes;
          this.directionsRenderer.setDirections(result);
        });
      });
    });
  }

  selectRoute(index: number) {
    this.selectedRouteIndex = index;
    this.selectedRoute = this.routes[index];
    this.directionsRenderer.setDirections({
      routes: [this.selectedRoute]
    });
    this.showStopPoints(this.selectedRoute);
  }

  showStopPoints(route: any) {
    this.stopPoints = route.legs[0].steps.map((step: any, i: number) => ({
      id: i,
      instruction: step.instructions.replace(/<[^>]+>/g, ''),
      location: step.start_location
    }));
  }

  selectStop(stop: any) {
    this.selectedStop = stop;
  }

  addCustomStop() {
    if (!this.customStop) return;
    this.stopPoints.push({
      id: this.stopPoints.length,
      instruction: this.customStop,
      location: null
    });
    this.customStop = '';
  }

  saveStopPoint() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.http.post('https://backend-bla-bla.onrender.com/api/user/stop', {
      instruction: this.selectedStop?.instruction,
      user_id: this.user.id,
      lat: 28.6139,
      lng: 77.2090
    }).subscribe(() => {
      this.router.navigate(['/calander']);
    });
  }
}
