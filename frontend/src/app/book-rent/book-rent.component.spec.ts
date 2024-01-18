import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BookRentComponent } from './book-rent.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';


describe('BookRentComponent', () => {
  let component: BookRentComponent;
  let fixture: ComponentFixture<BookRentComponent>;
  let snackBar: MatSnackBar;
  let authService: AuthService;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BookRentComponent],
    })
    .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule], // Add FormsModule here
      declarations: [BookRentComponent],
      providers: [MatSnackBar, AuthService, Router],
    }).compileComponents();
  
    fixture = TestBed.createComponent(BookRentComponent);
    component = fixture.componentInstance;
    component.book = { title: 'Test Book', author: 'Test Author' };
  
    snackBar = TestBed.inject(MatSnackBar);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should emit closePopup event when closeRentPopup is called', () => {
    const closePopupSpy = spyOn(component.closePopup, 'emit');
    component.closeRentPopup();
    expect(closePopupSpy).toHaveBeenCalled();
  });

  it('should show availability message when checkAvailability is called with valid dates', () => {
    component.startDate = '2022-01-01';
    component.endDate = '2022-01-10';
    component.checkAvailability();
    expect(component.availabilityMessage).toContain('This date range is available!');
    expect(component.isAvailabilityChecked).toBe(true);
  });

  it('should show error message when checkAvailability is called with invalid dates', () => {
    component.startDate = '2022-01-10';
    component.endDate = '2022-01-01';
    component.checkAvailability();
    expect(component.availabilityMessage).toContain('End date must be after start date.');
    expect(component.isAvailabilityChecked).toBe(false);
  });

  it('should show error message when checkAvailability is called without dates', () => {
    component.checkAvailability();
    expect(component.availabilityMessage).toContain('Please enter both start and end dates.');
    expect(component.isAvailabilityChecked).toBe(false);
  });

  it('should show error message when checkAvailability is called with empty start date', () => {
    component.endDate = '2022-01-10';
    component.checkAvailability();
    expect(component.availabilityMessage).toContain('Please enter both start and end dates.');
    expect(component.isAvailabilityChecked).toBe(false);
  });

  it('should show error message when checkAvailability is called with empty end date', () => {
    component.startDate = '2022-01-01';
    component.checkAvailability();
    expect(component.availabilityMessage).toContain('Please enter both start and end dates.');
    expect(component.isAvailabilityChecked).toBe(false);
  });

  it('should show error message when checkAvailability is called with available date range', () => {
    const isDateRangeAvailableSpy = spyOn(component as any, 'isDateRangeAvailable').and.callThrough();
    
    component.startDate = '2022-01-01';
    component.endDate = '2022-01-10';
    component.checkAvailability();
  
    expect(component.availabilityMessage).toContain('This date range is available!');
    expect(component.isAvailabilityChecked).toBe(true);

    expect(isDateRangeAvailableSpy).toHaveBeenCalledOnceWith(jasmine.any(Date), jasmine.any(Date));
  });

  it('should call snackBar.open when rentBook is called and user is logged in', fakeAsync(() => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const snackBarOpenSpy = spyOn(snackBar, 'open');
    
    component.startDate = '2022-01-01';
    component.endDate = '2022-01-10';
    component.isAvailabilityChecked = true;
    component.rentBook();
    
    tick();
    expect(snackBarOpenSpy).toHaveBeenCalled();
  }));

  it('should show error message when rentBook is called without checking availability first', () => {
    const routerNavigateSpy = spyOn(router, 'navigate');
    const snackBarOpenSpy = spyOn(snackBar, 'open');
    
    component.rentBook();
    
    expect(component.availabilityMessage).toContain('Please press the check button first.');
    expect(routerNavigateSpy).not.toHaveBeenCalled();
    expect(snackBarOpenSpy).not.toHaveBeenCalled();
  });
});