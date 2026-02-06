import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Game {
  title: string;
  url: string;
}

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {

  games: Game[] = [
    {
      title: 'Tick Tack Game',
      url: 'https://mhima-sharma.github.io/-tick-tack-/'
    },
    {
      title: 'Random Math Problem',
      url: 'https://mhima-sharma.github.io/random-math-problem/'
    }
  ];

  selectedGameUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  playGame(gameUrl: string) {
    this.selectedGameUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(gameUrl);
  }
}
