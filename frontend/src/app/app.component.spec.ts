import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialog } from '@angular/material/dialog';
import { BookDescriptionComponent } from './book-description/book-description.component';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let router: Router;
  let dialog: MatDialog;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule], 
      declarations: [AppComponent],
      providers: [MatDialog, AuthService],
    }).compileComponents();
    
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    authService = TestBed.inject(AuthService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to book-list on searchBooks', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    app.searchBooks('query');
    expect(navigateSpy).toHaveBeenCalledWith(['/book-list', 'query']);
  });

  it('should open book details dialog on showBookDetails', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const dialogOpenSpy = spyOn(dialog, 'open');
    const mockBook = {
      title: 'Mock Book',
      author: 'Mock Author',
      description: 'Mock Description',
      year: '2022',
      pages: '200',
      genres: ['Fiction'],
    };
    app.showBookDetails(mockBook);
    expect(dialogOpenSpy).toHaveBeenCalledWith(BookDescriptionComponent, {
      width: '400px',
      data: {
        title: mockBook.title,
        author: mockBook.author,
        description: mockBook.description,
        year: mockBook.year,
        pages: mockBook.pages,
        genre: mockBook.genres,
      },
    });
  });

  it('should return true if user is logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const result = app.isLoggedIn();
    expect(result).toBe(true);
  });

  it('should call authService.logout on logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const authServiceLogoutSpy = spyOn(authService, 'logout');
    app.logout();
    expect(authServiceLogoutSpy).toHaveBeenCalled();
  });

  it('should navigate to /authentification on navigateToLogin', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    app.navigateToLogin();
    expect(navigateSpy).toHaveBeenCalledWith(['/authentification']);
  });
});
