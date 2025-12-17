import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-publishride-calander',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './publishride-calander.component.html',
  styleUrl: './publishride-calander.component.css'
})
export class PublishrideCalanderComponent implements OnInit {
  months: Date[] = [];
  selectedDates: Set<string> = new Set();

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateMonths();
  }

  // generateMonths() {
  //   const today = new Date();
  //   const startYear = today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
  //   const startDate = new Date(startYear, 3, 1); // April 1st
  //   const endDate = new Date(startYear + 1, 4, 0); // April 30 next year

  //   let current = new Date(startDate);
  //   this.months = [];

  //   while (current <= endDate) {
  //     this.months.push(new Date(current));
  //     current.setMonth(current.getMonth() + 1);
  //   }
  // }


  generateMonths() {
  this.months = [];

  const today = new Date();
  const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  for (let i = 0; i < 12; i++) {
    this.months.push(
      new Date(startMonth.getFullYear(), startMonth.getMonth() + i, 1)
    );
  }
}


  getDaysInMonth(month: Date): Date[] {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const days: Date[] = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize time

    const numDays = new Date(year, monthIndex + 1, 0).getDate();
    for (let i = 1; i <= numDays; i++) {
      const currentDate = new Date(year, monthIndex, i);
      currentDate.setHours(0, 0, 0, 0); // Normalize

      // ✅ Show only today or future dates
      if (currentDate >= today) {
        days.push(currentDate);
      }
    }

    return days;
  }

  isSelected(date: Date): boolean {
    return this.selectedDates.has(date.toDateString());
  }

  toggleDateSelection(date: Date) {
    const dateStr = date.toDateString();
    if (this.selectedDates.has(dateStr)) {
      this.selectedDates.delete(dateStr);
    } else {
      this.selectedDates.add(dateStr);
    }
  }

  publishRides() {
    console.log("Publishing rides for:", Array.from(this.selectedDates));
    this.router.navigate(['/time']); 
    // API call to backend can be added here
  }

  formatMonthYear(date: Date): string {
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }
}
