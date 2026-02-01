import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complaints',
  imports: [CommonModule],
  templateUrl: './complaints.component.html'
})
export class ComplaintsComponent implements OnInit {

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

  markResolved(id: number) {
    this.http
      .put(`https://backend-bla-bla.onrender.com/api/complaints/update-status/${id}`, {
        status: 'resolved'
      })
      .subscribe(() => {
        this.fetchComplaints(); // refresh list
      });
  }
}
