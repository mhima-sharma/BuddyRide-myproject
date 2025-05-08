import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { SearchComponent } from "../search/search.component";
import { bootstrapApplication } from '@angular/platform-browser';
import { TrustComponent } from "../trust/trust.component";
import { FooterComponent } from "../footer/footer.component";
import { RideCardsComponent } from "../ride-cards/ride-cards.component";
import { WhereTrevelComponent } from "../where-trevel/where-trevel.component";


@Component({
  selector: 'app-home',
  imports: [HeaderComponent, DashboardComponent, SearchComponent, TrustComponent, FooterComponent, RideCardsComponent, WhereTrevelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
