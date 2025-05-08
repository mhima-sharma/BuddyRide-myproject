import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth-modal',
  imports: [],
  templateUrl: './user-auth-modal.component.html',
  styleUrl: './user-auth-modal.component.css'
})
export class UserAuthModalComponent {
  @Output() close = new EventEmitter<void>();
  constructor(private router: Router) {}
  closeModal() {
    this.close.emit();
  }

  onLogin() {
    // navigate or emit event for login
    console.log('Login clicked');
    this.router.navigate(['/login']);
  }

  onSignup() {
    // navigate or emit event for signup
    console.log('Signup clicked');
    this.router.navigate(['/signup']);
  }
}
