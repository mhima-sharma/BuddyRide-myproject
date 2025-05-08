import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logout-popup',
  imports: [CommonModule,RouterLink],
  templateUrl: './logout-popup.component.html',
  styleUrl: './logout-popup.component.css'
})
export class LogoutPopupComponent {
  constructor(private router: Router) {}
  // logout() {
  //   // Clear token/session/etc
  //   localStorage.clear(); // Or your token service
  //   // Navigate to login page
  //   this.router.navigate(['/login']);
  // }
//   showModal = false;

// logout() {
//   this.showModal = false;
//   localStorage.clear();
//   this.router.navigate(['/login']);
// }
}
