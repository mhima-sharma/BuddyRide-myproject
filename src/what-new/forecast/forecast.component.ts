import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnChanges {

  @Input() city: string = '';

  forecast: any[] = [];
  isLoading = false;
  errorMsg = '';

  // ⚠️ DEMO ONLY (later move to environment.ts)
  private readonly API_KEY = '168771779c71f3d64106d8a88376808a';

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city']) {
      const newCity = this.city?.trim();

      if (newCity && newCity.length > 0) {
        this.fetchForecast(newCity);
      }
    }
  }

  fetchForecast(city: string) {
    this.isLoading = true;
    this.errorMsg = '';
    this.forecast = [];

    const url =
      `https://api.openweathermap.org/data/2.5/forecast` +
      `?q=${city}&appid=${this.API_KEY}&units=metric`;

    console.log('📡 Forecast API:', url);

    this.http.get<any>(url).subscribe({
      next: (res) => {
        if (!res.list || !res.list.length) {
          this.errorMsg = 'No forecast data available';
          this.isLoading = false;
          return;
        }

        // pick 12:00 PM data for next days
        const daily = res.list.filter((item: any) =>
          item.dt_txt.includes('12:00:00')
        );

        this.forecast = daily.slice(0, 3);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Forecast API error', err);
        this.errorMsg = 'Forecast not available';
        this.isLoading = false;
      }
    });
  }
}
