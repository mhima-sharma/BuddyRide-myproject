import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.adminService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/admin/login']);
    return false;
  }
}
