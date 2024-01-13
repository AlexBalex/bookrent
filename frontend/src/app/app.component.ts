import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookDescriptionComponent } from './book-description/book-description.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newReleases = [
    {
      title: 'Light Bringer',
      author: 'Pierce Brown',
      image: '../assets/light.png',
      year: '2023',
      pages: '682',
      genres: ['Fantasy', 'Dystopian'],
      description: 'Darrow returns as Pierce Brown’s New York Times bestselling Red Rising series continues in the thrilling sequel to Dark Age.'
    },
    {
      title: 'Bookshops & Bonedust',
      author: 'Travis Baldree',
      image: '../assets/lattee.png',
      year: '2023',
      pages: '352',
      genres: ['Fantasy', 'Adventure'],
      description: 'When an injury throws a young, battle-hungry orc off her chosen path, she may find that what we need isn\'t always what we seek.'
    },
    {
      title: 'The Narrow Road Between Desires',
      author: 'Patrick Rothfuss',
      image: '../assets/road.png',
      year: '2023',
      pages: '240',
      genres: ['Fantasy'],
      description: '#1 New York Times-bestselling phenomenon Patrick Rothfuss returns to the wildly popular Kingkiller Chronicle universe with a stunning reimagining of "The Lightning Tree." Expanded to twice its previous length and lavishly illustrated by Nathan Taylor, this touching stand-alone story is sure to please new readers and veteran Rothfuss fans alike.'
    },
  ];

  constructor(private router: Router, public dialog: MatDialog,private authService: AuthService,) {}

  searchBooks(query: string): void {
    this.router.navigate(['/book-list', query]);
  }
  showBookDetails(book: any): void {
    const dialogRef = this.dialog.open(BookDescriptionComponent, {
      width: '400px',
      data: {
        title: book.title,
        author: book.author,
        description: book.description,
        year: book.year,
        pages: book.pages,
        genre: book.genres,
      }
    });
  }

  isLoggedIn(): boolean {
    // Implement the logic to check if the user is logged in
    return this.authService.isLoggedIn();
  }

  logout(): void {
    // Implement the logic to handle logout
    this.authService.logout();
    // You may also want to navigate to the login page or perform other actions
  }

  navigateToLogin(): void {
    this.router.navigate(['/authentification']);
  }
}