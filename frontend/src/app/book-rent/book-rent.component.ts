// book-rent.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-rent',
  templateUrl: './book-rent.component.html',
  styleUrls: ['./book-rent.component.css']
})
export class BookRentComponent {
  @Input() book: any | null; 
  @Output() closePopup = new EventEmitter<void>();
  startDate: string = ''; 
  endDate: string = '';
  isAvailabilityChecked: boolean = false;
  availabilityMessage: string = '';

  constructor(private snackBar: MatSnackBar, private authService: AuthService, private router: Router) { }

  rentBook(): void {
    if (this.book && this.isAvailabilityChecked) {
      // Display a pop-up message with book rental details
      if (this.authService.isLoggedIn()) {
        const message = `You have rented "${this.book.title}" from ${this.startDate} to ${this.endDate}. 
        You can pick up the book from Str Ovidiu 23.`;

        this.snackBar.open(message, 'Close', {
          verticalPosition: 'top', // Position of the snackbar
          horizontalPosition: 'center' // Position of the snackbar
        });

      } else {
        this.router.navigate(['/authentification']);
      }
    } else {
      this.availabilityMessage = 'Please press the check button first.';
    }
  }

  closeRentPopup(): void {
    this.closePopup.emit();
  }

  checkAvailability(): void {
    // Verify that both start and end dates are not empty
    if (this.startDate && this.endDate) {
      const startDateObj = new Date(this.startDate);
      const endDateObj = new Date(this.endDate);

      const isAvailable = this.isDateRangeAvailable(startDateObj, endDateObj);

      if (endDateObj > startDateObj) {
        if (isAvailable) {
          this.availabilityMessage = 'This date range is available!';
          this.isAvailabilityChecked = true;
        } else {
          this.availabilityMessage = 'This date range is not available.';
          this.isAvailabilityChecked = false;
        }
      } else {
        this.availabilityMessage = 'End date must be after start date.';
      }
    } else {
      this.availabilityMessage = 'Please enter both start and end dates.';
    }
  }

  private isDateRangeAvailable(startDate: Date, endDate: Date): boolean {
    return true;
  }
}
