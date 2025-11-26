import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  AfterViewInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-pickup-location',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './pickup-location.component.html',
  styleUrls: ['./pickup-location.component.css']
})
export class PickupLocationComponent {
  map: any;
  directionsService: any;
  directionsRenderer: any;

  pickupAddress: string = '';
  dropoffAddress: string = '';
  customStop: string = ''; // for custom stop input

  routes: any[] = [];
  selectedRouteIndex: number = -1;
  selectedRoute: any = null;

  stepMarkers: any[] = []; // to store stop points markers
  stopPoints: any[] = []; // to store stop points list
  selectedStop: any = { id: null }; // to store the selected stop point by the user
  user:any
  
  @ViewChild('locationInput', { static: false }) locationInput!: ElementRef;
  @ViewChild('DropoffInput', { static: false }) dropoffInput!: ElementRef;
  constructor(private http: HttpClient,private router: Router,private ngZone: NgZone) {}

// autofill location 


// this.initMap();

ngAfterViewInit(): void {
  this.initMap();
  this.initAutocomplete(this.locationInput.nativeElement, 'pickup');
  this.initAutocomplete(this.dropoffInput.nativeElement, 'dropoff');
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
        this.pickupAddress = address;
      } else {
        this.dropoffAddress = address;
      }

      console.log(`${type} address:`, address);
      console.log('Coordinates:', place.geometry?.location?.lat(), place.geometry?.location?.lng());
    });
  });
}



  ngOnInit(): void {
  
    
    this.directionsService = new google.maps.DirectionsService();
  }

  // ngAfterViewInit(): void {
  //   this.initMap();
  // }

  initMap(): void {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, {
        center: { lat: 28.6139, lng: 77.2090 },
        zoom: 13
      });

      this.directionsRenderer = new google.maps.DirectionsRenderer({
        map: this.map,
        suppressMarkers: false,
      });
    } else {
      console.error('Map element not found!');
    }
  }

  geocodeAddress(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results: any, status: any) => {
        if (status === 'OK') {
          resolve(results[0].geometry.location);
        } else {
          reject('Address not found');
        }
      });
    });
  }

  async calculateRoute(): Promise<void> {
    try {
      const pickupLocation = await this.geocodeAddress(this.pickupAddress);
      const dropoffLocation = await this.geocodeAddress(this.dropoffAddress);

      this.getAllRoutes(pickupLocation, dropoffLocation);
    } catch (error) {
      alert('Error calculating route: ' + error);
    }
  }

  getAllRoutes(pickupLocation: any, dropoffLocation: any): void {
    const request = {
      origin: pickupLocation,
      destination: dropoffLocation,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        this.routes = result.routes;
        this.selectedRouteIndex = -1;
        this.directionsRenderer.setDirections(result); // show all routes initially
      } else {
        alert('Directions request failed due to ' + status);
      }
    });
  }

  selectRoute(index: number): void {
    this.selectedRouteIndex = index;

    const selectedRoute = this.routes[index];
    this.selectedRoute = selectedRoute; // Save the selected route

    const selectedResult = {
      geocoded_waypoints: [],
      routes: [selectedRoute],
      request: {}
    };

    this.directionsRenderer.setDirections(selectedResult); // Show only selected route

    this.clearStepMarkers(); // Clear old markers first
    console.log(selectedRoute,"<<<selectedRoute")
    this.showStopPoints(selectedRoute); // Show new stop points
  }



  

  clearStepMarkers(): void {
    for (let marker of this.stepMarkers) {
      marker.setMap(null);
    }
    this.stepMarkers = [];
    this.stopPoints = []; // clear old list of stop points
  }

  showStopPoints(route: any): void {
    console.log(route,"route");
    const steps = route.legs[0].steps; // Get steps in selected route
    console.log(steps,"steps");
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];

      const marker = new google.maps.Marker({
        position: step.start_location,
        map: this.map,
        label: `${i + 1}`,
        title: step.instructions.replace(/<[^>]+>/g, '') // Clean HTML tags
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<strong>Stop ${i + 1}:</strong> ${step.instructions.replace(/<[^>]+>/g, '')}`
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.stepMarkers.push(marker);

      // Add step point to list
      this.stopPoints.push({
        id: i,
        instruction: step.instructions.replace(/<[^>]+>/g, ''),
        location: step.start_location
      });
    }

    console.log("selectedStop", this.selectedStop);
  }

  selectStop(stop: any): void {
    this.selectedStop = stop; // Store the selected stop point
    this.addStopToRoute(); // Recalculate route with the selected stop
  }

  addStopToRoute(): void {
    if (this.selectedStop) {
      const newStopLocation = this.selectedStop.location;
      const newStopInstruction = this.selectedStop.instruction;

      // Add this stop to the current route as a waypoint (using DirectionsService)
      const routeRequest = {
        origin: this.selectedRoute.legs[0].start_location,
        destination: this.selectedRoute.legs[0].end_location,
        waypoints: [{ location: newStopLocation, stopover: true }],
        travelMode: google.maps.TravelMode.DRIVING
      };

      this.directionsService.route(routeRequest, (result: any, status: any) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(result);
        } else {
          alert('Failed to update route: ' + status);
        }
      });
    }
  }

  addCustomStop(): void {
    if (this.customStop) {
      // Add user custom stop to the list
      this.stopPoints.push({
        id: this.stopPoints.length,
        instruction: this.customStop,
        location: null // You can add logic here to geocode the custom address if you want to map it
      });

      // Clear the input field after adding the stop
      this.customStop = '';
    }
  }
  saveStopPoint(): void {
   
    this.user = JSON.parse(localStorage.getItem('user') || '{}');  
   
    console.log(this.selectedStop,"helloooo")
    const stopData = {
      instruction: this.selectedStop?.instruction || this.customStop,
      user_id: this.user.id,
      lat:20.593683,
      lng:78.962883
      // this.selectedStop.location.lat,
      // this.selectedStop.location.lng

    };
console.log("hiiiiiiiiiiiiiiiiiiiiiii")
    this.http.post('https://backend-bla-bla.onrender.com/api/user/stop', stopData).subscribe(
      (response:any) => {
        console.log("what is this" ,response)
        
        this.router.navigate(['/calander']); 
      },
      (error:any) => {
        alert('Error saving stop point!');

      }
    );
 }
 }
