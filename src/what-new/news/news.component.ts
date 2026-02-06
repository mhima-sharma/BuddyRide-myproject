import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {

  articles: any[] = [];
  isLoading = true;

  // ✅ GNEWS API (browser safe)
  private apiUrl =
    'https://gnews.io/api/v4/top-headlines?country=in&lang=en&max=6&token=3011a9af04f9e67e4c38abf50e497dd6';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        console.log('NEWS 👉', res);
        this.articles = res?.articles || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('NEWS ERROR ❌', err);
        this.isLoading = false;
      }
    });
  }
}
