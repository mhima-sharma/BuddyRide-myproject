import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // Reactive user state
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable(); // subscribe in components

  constructor() {
    // App start: check if user is already logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    if (storedUser && token) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Save token and user on login
  setLogin(token: string, user: any) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Update reactive state
    this.userSubject.next(user);
  }

  // Set user manually (like setUserLoggedIn)
  setUserLoggedIn(user: any) {
    this.userSubject.next(user);
  }

  // Get user info
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Logout
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
