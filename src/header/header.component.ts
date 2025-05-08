import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthModalComponent } from "../log-out/user-auth-modal.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  profileForm: any;
  // showModal: boolean;
  // showModal = false;

  // openModal() {
  //   this.showModal = true;
  // }
  constructor(private router: Router) {}
  mobileMenuOpen = false;
  dropdownOpen = false;
  
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}
// setting
actionOne() {
  console.log('Action One clicked');
  this.router.navigate([`/change-pass`]);
}


showModal = false;
handleFileInput(event: any, controlName: string): void {
  const file = event.target.files[0];
  if (file) {
    this.profileForm.get(controlName)?.setValue(file);
  }
}

logout() {
  // localStorage.clear(); 
    localStorage.removeItem('token'); // or sessionStorage.removeItem('token');
   
  
  this.router.navigate(['/logout']);
}
}
