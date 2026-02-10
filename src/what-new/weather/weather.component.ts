import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {

  city = '';
  searchCity = '';

  temperature: number | null = null;
  weatherIcon = '';
  description = '';
  isLoading = true;

  // ⚠️ DEMO ONLY – production me backend ya env use karo
  private readonly API_KEY = '168771779c71f3d64106d8a88376808a';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.detectLocation();
  }

  /* 📍 AUTO DETECT LOCATION */
  detectLocation() {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      this.isLoading = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.fetchWeatherByCoords(lat, lon);
      },
      (error) => {
        console.error('Location permission denied', error);
        this.isLoading = false;
      }
    );
  }

  /* 🌍 FETCH BY COORDS */
  fetchWeatherByCoords(lat: number, lon: number) {
    this.isLoading = true;

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`;

    this.http.get<any>(url).subscribe({
      next: (res) => this.handleResponse(res),
      error: (err) => this.handleError(err)
    });
  }

  /* 🔍 SEARCH BY CITY */
  searchWeather() {
    if (!this.searchCity.trim()) return;

    this.isLoading = true;

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${this.searchCity}&appid=${this.API_KEY}&units=metric`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.handleResponse(res);
        this.searchCity = '';
      },
      error: (err) => this.handleError(err)
    });
  }

  /* ✅ COMMON RESPONSE HANDLER */
  private handleResponse(res: any) {
    this.temperature = Math.round(res.main.temp);
    this.city = res.name;
    this.description = res.weather[0].description;
    this.weatherIcon =
      `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
    this.isLoading = false;
  }

  /* ❌ ERROR HANDLER */
  private handleError(err: any) {
    console.error('Weather API error', err);
    this.isLoading = false;
  }
}
