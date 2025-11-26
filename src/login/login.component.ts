import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.http.
    post('https://backend-bla-bla.onrender.com/api/auth/login', this.loginForm.value)
    .subscribe({
      next: (res: any) => {
        // alert('Login successful!');
        // Optional: store token or redirect
        this.router.navigate(['/home']);


        // Save token and user to localStorage
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      },
      error: (err: { error: { message: any; }; }) => {
        alert(err.error.message || 'Login failed!');
      }
    });
  }
}
