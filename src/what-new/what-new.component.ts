import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GamesComponent } from './games/games.component';
import { NewsComponent } from './news/news.component';
import { WeatherComponent } from './weather/weather.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ForecastComponent } from "./forecast/forecast.component";

@Component({
  selector: 'app-what-new',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    // NotificationsComponent,
    // GamesComponent,
    // WeatherComponent,
    NewsComponent,
    GamesComponent,
    WeatherComponent,
    // ForecastComponent
],
  templateUrl: './what-new.component.html',
  styleUrls: ['./what-new.component.css']
})
export class WhatNewComponent {

  today = new Date();

  // Tabs
  activeTab: 'games' | 'weather' | 'news' = 'games';

  // News control (API SAFE)
  newsLoaded = false;

  selectTab(tab: 'games' | 'weather' | 'news') {
    this.activeTab = tab;

    // Load news ONLY when user clicks News tab
    if (tab === 'news' && !this.newsLoaded) {
      this.loadNews();
    }
  }

 
  loadNews() {
    this.newsLoaded = true;
   
  }
}
