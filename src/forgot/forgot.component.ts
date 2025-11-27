// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-forgot',
//   imports: [RouterLink,ReactiveFormsModule],
//   templateUrl: './forgot.component.html',
//   styleUrl: './forgot.component.css'
// })
// export class ForgotComponent {
//   forgotForm: FormGroup;
//   user: any;

//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.forgotForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//     });
//   }

//   submit() {
//     const token = localStorage.getItem('authToken');
//     this.user = JSON.parse(localStorage.getItem('user') || '{}');  
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//     if (this.forgotForm.invalid) return;
//     this.http.post('https://backend-bla-bla.onrender.com/api/auth/reset-password',this.forgotForm.value, { headers }).subscribe({
//         next: () => alert('Reset link sent to your email'),
//         error: (err) => alert(err.error.message || 'Error occurred')
//       });
//   }
// }
// function subscribe(arg0: { next: () => void; error: (err: any) => void; }) {
//   throw new Error('Function not implemented.');
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { finalize } from 'rxjs/operators';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html'
})
export class ForgotComponent implements OnInit {
  form: FormGroup;
  token: string | null = null;
  submitting = false;
  message: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthServiceService,
    private router: Router
  ) {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      this.error = 'Invalid reset link.';
    }
  }

  passwordsMatch(group: FormGroup) {
    const a = group.get('newPassword')?.value;
    const b = group.get('confirmPassword')?.value;
    return a === b ? null : { notMatching: true };
  }

  submit() {
    this.error = null;
    this.message = null;
    if (!this.token) return;
    if (this.form.invalid) return;

    this.submitting = true;
    const newPassword = this.form.value.newPassword;

    this.auth.resetPassword(this.token, newPassword)
      .pipe(finalize(() => this.submitting = false))
      .subscribe({
        next: res => {
          this.message = 'Password reset successfully. Redirecting to login...';
          // small delay then redirect to login
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: err => {
          console.error(err);
          this.error = err?.error?.message || 'Token invalid or expired.';
        }
      });
  }
}
