import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-complaint-box',
  imports: [CommonModule,FormsModule],
  templateUrl: './complaint-box.component.html',
  styleUrl: './complaint-box.component.css'
})
export class ComplaintBoxComponent {
  userMessage: string = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userMessage.trim()) {
      alert("Please type a message");
      return;
    }

    const messageData = {
      userMessage: this.userMessage
    };

    this.http.post('http://localhost:3000/api/complaints/send-message', messageData)
      .subscribe({
        next: (res: any) => {
          alert(res.message);
          this.userMessage = '';
        },
        error: (err) => {
          alert("Something went wrong!");
          console.error(err);
        }
      });
  }
}
