import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookDescriptionComponent } from '../book-description/book-description.component';
import { BookService } from '../services/book.service';
import { Console } from 'console';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  searchTerm: string = '';
  isRentPopupOpen = false;
  selectedBook: any | null = null;
  books: any[] = [];
  
  filteredBooks: any[] = [];

  constructor(private router: Router,private dialog: MatDialog, private route: ActivatedRoute,private bookService: BookService) {
    this.route.paramMap.subscribe({
      next: params => {
        const query = params.get('filter');
        console.log(query)
        if(query!==null){
          this.searchTerm = query;
          this.search();
        }
      }
    })
  }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;

      this.search();
    });
  }
  
  search(): void {
    if(this.searchTerm==="")
      return;
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  rentBook(book: any): void {
    console.log(`Renting book: ${book.title}`);
  }

  showBookDetails(book: any): void {
    console.log(book)
    this.dialog.open(BookDescriptionComponent, {
      data: {
        title: book.title,
        author: book.author,
        description: book.description,
        year: book.year,
        pages: book.pages,
        genre: book.genre,
      }
    });
  }

  openRentPopup(book: any): void {
    this.isRentPopupOpen = true;
    this.selectedBook = book;
  }

  closeRentPopup(): void {
    this.isRentPopupOpen = false;
    this.selectedBook = null;
  }

  checkAvailability(book: any, startDate: string, endDate: string): void {
    console.log(`Checking availability for book ${book.title} from ${startDate} to ${endDate}`);
  }


}