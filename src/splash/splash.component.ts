// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-splash',
//   imports: [],
//   templateUrl: './splash.component.html',
//   styleUrl: './splash.component.css'
// })
// export class SplashComponent {

// }
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
      this.router.navigate(['/first']); // Navigate to your login or any other route
    }, 2000); // 3 seconds
  }
}

