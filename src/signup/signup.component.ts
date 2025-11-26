import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private http: HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: [''],
    });
  }

  
  onSubmit() {
    if (this.signupForm.invalid) return;
  
    this.http
      .post('https://backend-bla-bla.onrender.com/api/auth/signup', this.signupForm.value)
      .subscribe({
        next: (res: any) => {
          // Save token and user to localStorage
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
  
          alert(res.message); // Show success
          console.log('Signup success!', res);
  
          // Navigate to dashboard or login
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          alert(err.message || 'Signup failed');
        },
      });
  }
  
  } 


  


