// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-signup',
//   imports: [ReactiveFormsModule,RouterLink],
//   templateUrl: './signup.component.html',
//   styleUrl: './signup.component.css'
// })
// export class SignupComponent {
//   signupForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router,private http: HttpClient) {
//     this.signupForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       confirmPassword: [''],
//     });
//   }

  
//   onSubmit() {
//     if (this.signupForm.invalid) return;
  
//     this.http
//       .post('https://backend-bla-bla.onrender.com/api/auth/signup', this.signupForm.value)
//       .subscribe({
//         next: (res: any) => {
//           // Save token and user to localStorage
//           localStorage.setItem('authToken', res.token);
//           localStorage.setItem('user', JSON.stringify(res.user));
  
//           // alert(res.message); // Show success
//           // console.log('Signup success!', res);
  
//           // Navigate to dashboard or login
//           this.router.navigate(['/login']);
//         },
//         error: (err) => {
//           console.error(err);
//           alert(err.message || 'Signup failed');
//         },
//       });
//   }
  
//   } 


  


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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ CommonModule ,ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = true;
  showConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.http
      .post(
        'https://backend-bla-bla.onrender.com/api/auth/signup',
        this.signupForm.value
      )
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(err?.error?.message || 'Signup failed');
        }
      });
  }
}
