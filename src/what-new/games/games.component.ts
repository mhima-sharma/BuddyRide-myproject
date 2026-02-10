import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Game {
  title: string;
  url: string;
  thumbnail?: string; // 👈 added
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
      title: 'Tic Tac Toe',
      url: 'https://mhima-sharma.github.io/-tick-tack-/',
      thumbnail: 'assets/images/tictack.png' 
    },
    {
      title: 'Random Math Problem',
      url: 'https://mhima-sharma.github.io/random-math-problem/',
      thumbnail: 'assets/images/mathgame.png'
    }
  ];

  selectedGameUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  playGame(gameUrl: string) {
    this.selectedGameUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(gameUrl);
  }
}
