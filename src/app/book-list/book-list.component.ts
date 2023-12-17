import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookDescriptionComponent } from '../book-description/book-description.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  searchTerm: string = '';
  books: any[] = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis' },
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss' },
    { title: 'The Lies of Locke Lamora', author: 'Scott Lynch' },
    { title: 'The Eye of the World', author: 'Robert Jordan' },
    { title: 'The Way of Kings', author: 'Brandon Sanderson' },
    { title: 'The Shadow of the Gods', author: 'John Gwynne' },
    { title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien' },
    { title: 'The Two Towers', author: 'J.R.R. Tolkien' },
    { title: 'The Return of the King', author: 'J.R.R. Tolkien' },
    
  ];
  filteredBooks: any[] = [];

  constructor(private router: Router,private dialog: MatDialog) {}

  search(): void {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  showBookDetails(book: any): void {
    this.dialog.open(BookDescriptionComponent, {
      data: {
        title: book.title,
        author: book.author,
      }
    });
  }
}