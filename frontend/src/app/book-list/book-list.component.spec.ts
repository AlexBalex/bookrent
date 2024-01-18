import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, Subject  } from 'rxjs';
import { BookListComponent } from './book-list.component';
import { BookService } from '../services/book.service';
import { BookDescriptionComponent } from '../book-description/book-description.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let mockBookService: jasmine.SpyObj<BookService>;

  const paramMapSubject = new Subject();

  const mockActivatedRoute = {
    paramMap: paramMapSubject.asObservable()
  };

  
  beforeEach(() => {
    mockBookService = jasmine.createSpyObj('BookService', ['getBooks']);
    TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [MatDialogModule, RouterTestingModule],
      providers: [
        { provide: BookService, useValue: mockBookService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ filter: 'test' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books on ngOnInit', () => {
    mockBookService.getBooks.and.returnValue(of([{ title: 'Book 1' }, { title: 'Book 2' }]));

    component.ngOnInit();

    expect(component.books.length).toBe(2);
  });

  it('should filter books based on search term', () => {
    component.books = [
      { title: 'Angular', author: 'John Doe' },
      { title: 'React', author: 'Jane Doe' },
    ];

    component.searchTerm = 'angular';

    component.search();

    expect(component.filteredBooks.length).toBe(1);
    expect(component.filteredBooks[0].title).toBe('Angular');
  });

  it('should navigate to /home on goBack', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should open book details dialog on showBookDetails', () => {
    const dialogOpenSpy = spyOn((component as any).dialog, 'open');
    const mockBook = {
      title: 'Sample Book',
      author: 'Author',
      description: 'Sample Description',
      year: '2022',
      pages: '200',
      genre: ['Fiction'],
    };
  
    component.showBookDetails(mockBook);
  
    expect(dialogOpenSpy).toHaveBeenCalledWith(BookDescriptionComponent, {
      data: mockBook,
    });
  });

  it('should open the rent popup', () => {
    const mockBook = { title: 'Sample Book', author: 'Author' };

    component.openRentPopup(mockBook);

    expect(component.isRentPopupOpen).toBe(true);
    expect(component.selectedBook).toEqual(mockBook);
  });

  it('should close the rent popup', () => {
    component.closeRentPopup();

    expect(component.isRentPopupOpen).toBe(false);
    expect(component.selectedBook).toBeNull();
  });

  it('should log availability check on checkAvailability', () => {
    const consoleSpy = spyOn(console, 'log');
    const mockBook = { title: 'Sample Book', author: 'Author' };

    component.checkAvailability(mockBook, '2024-01-17', '2024-01-24');

    expect(consoleSpy).toHaveBeenCalledWith(
      'Checking availability for book Sample Book from 2024-01-17 to 2024-01-24'
    );
  });

  it('should open and close rent popup', () => {
    const mockBook = { title: 'Sample Book', author: 'Author' };
  
    component.openRentPopup(mockBook);
  
    expect(component.isRentPopupOpen).toBe(true);
    expect(component.selectedBook).toEqual(mockBook);
  
    component.closeRentPopup();
  
    expect(component.isRentPopupOpen).toBe(false);
    expect(component.selectedBook).toBeNull();
  });

});
