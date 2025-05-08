import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-book-ride',
  imports: [CommonModule,FormsModule],
  templateUrl: './book-ride.component.html',
  styleUrl: './book-ride.component.css'
})
export class BookRideComponent {
// selectedRide: any;
// selectedPaymentMethod: any;
// passengerCount = 1;
// bookRide() {
// throw new Error('Method not implemented.');
// }
// decrease() {
//   if (this.passengerCount > 1) this.passengerCount--;
// }

// increase() {
//   if (this.passengerCount < 5) this.passengerCount++;
// }

constructor(private socketService: SocketService) {}

ngOnInit() {
  // Listen for incoming ride requests
  this.socketService.listenForRideRequest();
}

// Method to request a ride
sendRideRequest() {
  const rideId = 19;  // Example Ride ID (can be dynamic)
  const userId = 11;  // Example User ID (can be dynamic)

  // Call API to request the ride
  this.socketService.requestRide(rideId).subscribe(
    (response) => {
      console.log('Ride request successfully sent:', response);
      // Optionally, handle the response (e.g., show a success message)
      alert('Ride request sent successfully!');
    },
    (error) => {
      console.error('Error sending ride request:', error);
      alert('Failed to send ride request');
    }
  );
}

ngOnDestroy() {
  // Disconnect socket when component is destroyed (clean up)
  this.socketService.disconnect();
}

}
