import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient,  } from '@angular/common/http';


@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit {

  users: any[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    this.loading = true;

   this.http.get<any[]>('http://localhost:4000/api/user-profiles/all')
  .subscribe({
    next: (res) => {
      this.users = res;
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.error = 'Failed to load users';
      this.loading = false;
    }
  });

  }

}
