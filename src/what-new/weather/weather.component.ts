import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {

  city = '';
  temperature: number | null = null;
  weatherIcon = '';
  description = '';
  isLoading = true;

  // ⚠️ DEMO ONLY – production me backend use karo
  private API_KEY = '168771779c71f3d64106d8a88376808a';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.detectLocation();
  }

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
        this.fetchWeather(lat, lon);
      },
      (error) => {
        console.error('Location permission denied', error);
        this.isLoading = false;
      }
    );
  }

  fetchWeather(lat: number, lon: number) {
    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.temperature = Math.round(res.main.temp);
        this.city = res.name;
        this.description = res.weather[0].description;
        this.weatherIcon =
          `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Weather API error', err);
        this.isLoading = false;
      }
    });
  }
}
