import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiKey = 'd730df89dac34be38a114c7c10eb7cc6';
  private baseUrl = 'https://newsapi.org/v2/top-headlines';

  constructor(private http: HttpClient) {}

  getTopHeadlines(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}?country=in&category=business&apiKey=${this.apiKey}`
    );
  }
}
