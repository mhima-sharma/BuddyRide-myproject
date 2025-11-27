import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  forgotForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    if (this.forgotForm.invalid) return;

    // Call the forgot-password endpoint (not reset-password)
    this.http.post('https://backend-bla-bla.onrender.com/api/auth/forgot-password', this.forgotForm.value)
      .subscribe({
        next: () => alert('Reset link sent to your email'),
        error: (err) => alert(err.error.message || 'Error occurred')
      });
  }
}
