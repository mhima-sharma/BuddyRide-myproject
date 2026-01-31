import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-logout-popup',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './logout-popup.component.html',
  styleUrls: ['./logout-popup.component.css']
})
export class LogoutPopupComponent {

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  confirmLogout() {
    // 1️⃣ Clear token & user
    this.authService.logout();

    // 2️⃣ Navigate to login page
    this.router.navigate(['/login']);
  }
}
