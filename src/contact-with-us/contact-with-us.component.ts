import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-contact-with-us',
  imports: [HeaderComponent, FooterComponent,CommonModule,FormsModule],
  templateUrl: './contact-with-us.component.html',
  styleUrl: './contact-with-us.component.css'
})
export class ContactWithUsComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const endpoint = 'https://getform.io/f/azywegjb';

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    this.http.post(endpoint, this.formData, { headers }).subscribe({
      next: () => {
        this.successMessage = 'Message sent successfully!';
        this.errorMessage = '';
        this.formData = { name: '', email: '', subject: '', message: '' }; // Reset form
      },
      error: () => {
        this.successMessage = '';
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    });
  }
}

