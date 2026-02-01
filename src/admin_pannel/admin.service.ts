import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private readonly ADMIN_EMAIL = 'admin@buddyride.com';
  private readonly ADMIN_PASSWORD = 'Admin@123';

  login(email: string, password: string): boolean {
    if (email === this.ADMIN_EMAIL && password === this.ADMIN_PASSWORD) {
      localStorage.setItem('adminToken', 'true');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('adminToken');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('adminToken') === 'true';
  }
}
