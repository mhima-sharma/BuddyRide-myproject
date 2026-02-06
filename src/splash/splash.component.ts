import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
})
export class SplashComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      const token = localStorage.getItem('token'); // or your auth key

      if (token) {
        // User is logged in
        this.router.navigate(['/home']);
      } else {
        // User is NOT logged in
        this.router.navigate(['/guest']);
      }
    }, 2000);
  }
}
