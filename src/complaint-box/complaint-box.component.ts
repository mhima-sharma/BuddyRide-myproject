import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-complaint-box',
  imports: [CommonModule, FormsModule, HeaderComponent, RouterLink],
  templateUrl: './complaint-box.component.html',
  styleUrl: './complaint-box.component.css'
})
export class ComplaintBoxComponent {
  userMessage: string = '';
  successMessage: string = '';
  router: any;

  constructor(private http: HttpClient,router: Router) {}

  sendMessage() {
    
    if (!this.userMessage.trim()) {
      alert("Please type a message");
      return;
    }
    
    

    const messageData = {
      userMessage: this.userMessage
    };

    this.http.post('https://backend-bla-bla.onrender.com/api/complaints/send-message', messageData)
      .subscribe({
        next: (res: any) => {
          alert(res.message);
          this.userMessage = '';
          this.successMessage = "Your complaint has been sent successfully!";
          setTimeout(() => {
      this.router.navigate(['/home']); // adjust route as per your app
    }, 1000);
        },
        error: (err) => {
          alert("Something went wrong!");
          console.error(err);
        }
      });
  }
}
