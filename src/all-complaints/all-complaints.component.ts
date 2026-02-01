import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-all-complaints',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './all-complaints.component.html',
  styleUrl: './all-complaints.component.css'
})
export class AllComplaintsComponent  implements OnInit{
    complaints: any[] = [];
constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchComplaints();
  }
 fetchComplaints() {
    this.http
      .get<any[]>('https://backend-bla-bla.onrender.com/api/complaints/get-complaints')
      .subscribe(res => this.complaints = res);
  }
}
