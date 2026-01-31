import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Auto-login if token exists
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.authService.setUserLoggedIn(JSON.parse(user));
      this.router.navigate(['/home']); // redirect to home if already logged in
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.http
      .post(
        'https://backend-bla-bla.onrender.com/api/auth/login',
        this.loginForm.value
      )
      .subscribe({
        next: (res: any) => {
          // Save token & user in localStorage for persistent login
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));

          // Update AuthService state
          this.authService.setUserLoggedIn(res.user);

          // Navigate to home
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert(err?.error?.message || 'Login failed!');
        }
      });
  }
}
