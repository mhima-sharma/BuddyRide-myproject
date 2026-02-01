import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-social',
  standalone: true,   // ✅ MUST
  imports: [CommonModule, FormsModule],
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'] // ✅ FIXED
})
export class SocialComponent {

  password: string = '';
  errorMsg: string = '';
  isAuthenticated: boolean = false;

  private readonly CORRECT_PASSWORD = '12345';

  checkPassword() {
    if (this.password === this.CORRECT_PASSWORD) {
      this.isAuthenticated = true;
      this.errorMsg = '';
    } else {
      this.errorMsg = '❌ Wrong password';
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.password = '';
  }
}
