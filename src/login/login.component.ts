import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = true;
  isLoading = false;

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

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.http
      .post<any>(
        'https://backend-bla-bla.onrender.com/api/auth/login',
        this.loginForm.value
      )
      .subscribe({
        next: (res) => {
          // ✅ Save auth data ONLY after successful login
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));

          // ✅ Update auth state
          this.authService.setUserLoggedIn(res.user);

          // ✅ Redirect AFTER login
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
          alert(err?.error?.message || 'Login failed!');
        }
      });
  }
}
