import { Component, OnInit } from '@angular/core';
import { RideService } from '../services/ride.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-user-rides',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './user-rides.component.html',
  styleUrl: './user-rides.component.css'
})
export class UserRidesComponent implements OnInit {
  rides: any[]=[];
  user:any; // you’ll get this dynamically after login

  constructor(private rideService: RideService) {}
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');  
    this.rideService.getUserRides(this.user.id).subscribe((res:any)=>{
      this.rides=res;
    })
  }

}
