import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
  forgotForm: FormGroup;
  user: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    const token = localStorage.getItem('authToken');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if (this.forgotForm.invalid) return;
    this.http.post('http://localhost:3000/api/auth/reset-password',this.forgotForm.value, { headers }).subscribe({
        next: () => alert('Reset link sent to your email'),
        error: (err) => alert(err.error.message || 'Error occurred')
      });
  }
}
function subscribe(arg0: { next: () => void; error: (err: any) => void; }) {
  throw new Error('Function not implemented.');
}

