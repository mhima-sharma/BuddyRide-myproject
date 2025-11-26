import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  standalone:true
})
export class ResetPasswordComponent {
  // resetForm: FormGroup;
  // token: string | null;

  // constructor(
  //   private fb: FormBuilder,
  //   private route: ActivatedRoute,
  //   private http: HttpClient,
  //   private router: Router
  // ) {
  //   this.token = this.route.snapshot.queryParamMap.get('token');

  //   this.resetForm = this.fb.group(
  //     {
  //       newPassword: ['', [Validators.required, Validators.minLength(6)]],
  //       confirmPassword: ['', [Validators.required]]
  //     },
  //     { validators: this.passwordsMatch }
  //   );
  // }

  // passwordsMatch(form: FormGroup) {
  //   return form.get('newPassword')?.value === form.get('confirmPassword')?.value
  //     ? null : { mismatch: true };
  // }

  // submit() {
  //   if (this.resetForm.invalid || !this.token) return;

  //   const { newPassword } = this.resetForm.value;
  //   this.http.post('https://backend-bla-bla.onrender.com/auth/reset-password', {
  //     token: this.token,
  //     newPassword: newPassword
  //   }).subscribe({
  //     next: () => {
  //       alert('Password reset successful!');
  //       this.router.navigate(['/login']);
  //     },
  //     error: (err) => alert(err.error.message || 'Something went wrong')
  //   });
  // }
 
}
