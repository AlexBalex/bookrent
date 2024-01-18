import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDescriptionComponent } from './book-description.component';

describe('BookDescriptionComponent', () => {
  let component: BookDescriptionComponent;
  let fixture: ComponentFixture<BookDescriptionComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookDescriptionComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
    });

    fixture = TestBed.createComponent(BookDescriptionComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});

