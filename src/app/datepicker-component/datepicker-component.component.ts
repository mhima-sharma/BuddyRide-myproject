import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-datepicker-component',
  standalone: true,
  imports: [
    MatDatepickerModule,  // Import MatDatepicker module
    MatInputModule,       // Import MatInput module for the input field
    MatNativeDateModule,  // Import MatNativeDate module for date handling
    FormsModule 
  ],
  templateUrl: './datepicker-component.component.html',
  styleUrl: './datepicker-component.component.css'
})
export class DatepickerComponentComponent {
  selectedDate: Date | null = null; 
}
