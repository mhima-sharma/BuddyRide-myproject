import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private serverUrl: string = 'https://backend-bla-bla.onrender.com'; // Replace with your backend URL

  constructor(private http: HttpClient) {
    this.socket = io(this.serverUrl, {
      transports: ['websocket'], // optional: enforce WebSocket only
      autoConnect: true
    });

    // Register the user once the socket connects
    this.socket.on('connect', () => {
      const userId = localStorage.getItem('userId'); // Ensure this is stored after login
      if (userId) {
        this.socket.emit('register', userId);
        console.log('✅ Socket registered with user ID:', userId);
      } else {
        console.warn('❌ No user ID found in localStorage');
      }
    });
  }

  /**
   * Listen for real-time ride requests from server (e.g., driver side)
   */
  listenForRideRequest() {
    this.socket.on('ride-request', (data, callback) => {
      console.log('📩 Received ride request:', data);

      // Example action
      alert(`New ride request for Ride ID: ${data.rideId}`);

      // Send acknowledgment back to server
      callback({ status: 'received', rideId: data.rideId });
    });
  }

  /**
   * Send ride request to server using HTTP (rider side)
   */
  requestRide(rideId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const userId =  JSON.parse(localStorage.getItem('user') || '{}'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `https://backend-bla-bla.onrender.com/api/rides/${rideId}/request`;
    const body = { rideId,userId, status: 'pending' };

    return this.http.post(url, body, { headers });
  }

  /**
   * Send a ride-request event (optional for testing)
   */
  sendRideRequestViaSocket(rideId: number, userId: number) {
    this.socket.emit('ride-request', { rideId, userId });
  }

  /**
   * Disconnect the socket
   */
  disconnect() {
    this.socket.disconnect();
  }
}
