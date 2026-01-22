import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { SeoService } from '../services/seo.service';
import { SEO_ROUTES } from '../services/seo-routes';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // fix typo here
})
export class AppComponent implements OnInit {
  title = 'buddy-rideBuddyRide by DevNest-MS – Smart & Safe Carpooling Platform for Commuters';

  constructor(private router: Router, private seo: SeoService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Remove query params and leading slash
        const fullPath = event.urlAfterRedirects.split('?')[0];
        const path = fullPath.startsWith('/') ? fullPath.slice(1) : fullPath;

        // Get SEO data safely, fallback to home if not found
        const seoData = SEO_ROUTES[path] || SEO_ROUTES[''] || {
          title: 'BuddyRide by DevNest-MS – Smart & Safe Carpooling Platform for Commuters',
          description: 'BuddyRide carpool platform',
          url: '/'
        };

        this.seo.setMetaData(
          seoData.title,
          seoData.description,
          `https://buddy-ride-myproject.vercel.app${seoData.url}`
        );
      }
    });
  }
}
