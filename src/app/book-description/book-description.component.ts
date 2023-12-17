import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.css']
})
export class BookDescriptionComponent {
  constructor(
  public dialogRef: MatDialogRef<BookDescriptionComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}