import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { RideListComponent } from "../ride-list/ride-list.component";
import { PublishRidesComponent } from "../publish-rides/publish-rides.component";
import { ComplaintsComponent } from "../complaints/complaints.component";
import { AllUsersComponent } from "../all-users/all-users.component";
import { SocialComponent } from "../social/social.component";

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RideListComponent, PublishRidesComponent, ComplaintsComponent, AllUsersComponent, SocialComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
getTabIconClass(arg0: string): string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined {
throw new Error('Method not implemented.');
}

  // ================= RAW DATA =================
  users: any[] = [];
  signupUsers: any[] = [];
  rides: any[] = [];
  publishedRides: any[] = [];
  rideRequests: any[] = [];
  complaints: any[] = [];

  // ================= COUNTS =================
  usersCount = 0;
  signupUsersCount = 0;
  publishedRidesCount = 0;
  rideRequestsCount = 0;
  complaintsCount = 0;

  // ================= TAB STATE =================
  activeTab: string = 'users';

  tabs = [
    { key: 'users', label: 'Users', count: 0 },
    // { key: 'signup_users', label: 'Signup Requests', count: 0 },
    { key: 'social', label: 'Social', count: 0 },
    { key: 'published_rides', label: 'Published Rides', count: 0 },
    { key: 'ride_requests', label: 'Ride Requests', count: 0 },
    { key: 'complaints', label: 'Complaints', count: 0 },
  ];

  // ================= SIDEBAR =================
  sidebarOpen = false;

  private API = 'https://backend-bla-bla.onrender.com/api/';

  constructor(
    private http: HttpClient,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  // ================= FETCH ALL DATA =================
  loadDashboardData() {

    // this.http.get<any[]>(`${this.API}/users`).subscribe(res => {
    //   this.users = res || [];
    //   this.usersCount = this.users.length;
    //   this.updateTabCount('users', this.usersCount);
    // });

   

    // this.http.get<any[]>(`${this.API}/rides`).subscribe(res => {
    //   this.rides = res || [];
    //   this.ridesCount = this.rides.length;
    //   this.updateTabCount('rides', this.ridesCount);
    // });

    // this.http.get<any[]>(`${this.API}/published-rides`).subscribe(res => {
    //   this.publishedRides = res || [];
    //   this.publishedRidesCount = this.publishedRides.length;
    //   this.updateTabCount('published_rides', this.publishedRidesCount);
    // });

    // this.http.get<any[]>(`${this.API}/ride-requests`).subscribe(res => {
    //   this.rideRequests = res || [];
    //   this.rideRequestsCount = this.rideRequests.length;
    //   this.updateTabCount('ride_requests', this.rideRequestsCount);
    // });

    // this.http.get<any[]>(`${this.API}/complaints`).subscribe(res => {
    //   this.complaints = res || [];
    //   this.complaintsCount = this.complaints.length;
    //   this.updateTabCount('complaints', this.complaintsCount);
    // });
  }

  // ================= TAB COUNT UPDATE =================
  updateTabCount(key: string, count: number) {
    const tab = this.tabs.find(t => t.key === key);
    if (tab) tab.count = count;
  }

  // ================= TAB SWITCH =================
  changeTab(tabKey: string) {
    this.activeTab = tabKey;
    this.sidebarOpen = false; // close sidebar on mobile
  }

  // ================= SIDEBAR TOGGLE =================
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // ================= LOGOUT =================
  logout() {
    this.adminService.logout();
    this.router.navigate(['/admin-login']);
  }
}
