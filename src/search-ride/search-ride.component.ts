import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-search-ride',
  imports: [HeaderComponent, SearchComponent],
  templateUrl: './search-ride.component.html',
  styleUrl: './search-ride.component.css'
})
export class SearchRideComponent {

}
