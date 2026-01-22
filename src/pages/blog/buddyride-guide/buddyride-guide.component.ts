import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buddyride-guide',
  imports: [CommonModule ],
  templateUrl: './buddyride-guide.component.html',
  styleUrl: './buddyride-guide.component.css'
})
export class BuddyrideGuideComponent {
 activeSection = 'getting-started';
 // add inside your component.ts
isSidebarOpen = false;

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

closeSidebar() {
  this.isSidebarOpen = false;
}


  setSection(section: string) {
    this.activeSection = section;
  }
}
