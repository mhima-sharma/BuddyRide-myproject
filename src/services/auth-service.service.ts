import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
  
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
