import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      year: 1937,
      pages: 310,
      genres: ['Fantasy', 'Adventure'],
      description: 'The Hobbit is a fantasy novel by J.R.R. Tolkien. It follows the journey of Bilbo Baggins, a hobbit who is reluctantly swept into an epic quest to reclaim the lost Dwarf Kingdom of Erebor from the dragon Smaug.'
    },
    {
      title: 'The Lion, the Witch and the Wardrobe',
      author: 'C.S. Lewis',
      year: 1950,
      pages: 208,
      genres: ['Fantasy'],
      description: 'The Lion, the Witch and the Wardrobe is a fantasy novel by C.S. Lewis. It is the first book in The Chronicles of Narnia series and tells the story of four siblings who discover a magical world through a wardrobe.'
    },
    {
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      year: 2007,
      pages: 662,
      genres: ['Fantasy'],
      description: 'The Name of the Wind is a fantasy novel by Patrick Rothfuss. It is the first book in The Kingkiller Chronicle series and follows the life of Kvothe, a magically gifted young man who grows to be the most notorious wizard his world has ever seen.'
    },
    {
      title: 'The Lies of Locke Lamora',
      author: 'Scott Lynch',
      year: 2006,
      pages: 499,
      genres: ['Fantasy', 'Adventure'],
      description: 'The Lies of Locke Lamora is a fantasy novel by Scott Lynch. It follows the exploits of a group of con artists known as the Gentlemen Bastards in the city of Camorr.'
    },
    {
      title: 'The Eye of the World',
      author: 'Robert Jordan',
      year: 1990,
      pages: 684,
      genres: ['Fantasy', 'Adventure'],
      description: 'The Eye of the World is a fantasy novel by Robert Jordan. It is the first book in The Wheel of Time series and follows a young man named Rand al\'Thor as he embarks on a journey to save the world from an ancient evil.'
    },
    {
      title: 'The Way of Kings',
      author: 'Brandon Sanderson',
      year: 2010,
      pages: 1007,
      genres: ['Fantasy'],
      description: 'The Way of Kings is a fantasy novel by Brandon Sanderson. It is the first book in The Stormlight Archive series and explores the stories of several characters in a world torn by magical storms and war.'
    },
    {
      title: 'The Shadow of the Gods',
      author: 'John Gwynne',
      year: 2021,
      pages: 496,
      genres: ['Fantasy'],
      description: 'The Shadow of the Gods is a fantasy novel by John Gwynne. It is set in a world inspired by Norse mythology and follows the stories of three protagonists as they navigate a land filled with monsters, gods, and secrets.'
    },
    {
      title: 'The Fellowship of the Ring',
      author: 'J.R.R. Tolkien',
      year: 1954,
      pages: 423,
      genres: ['Fantasy'],
      description: 'The Fellowship of the Ring is a fantasy novel by J.R.R. Tolkien. It is the first book in The Lord of the Rings trilogy and follows the journey of a young hobbit named Frodo Baggins as he sets out to destroy a powerful ring.'
    },
    {
      title: 'The Two Towers',
      author: 'J.R.R. Tolkien',
      year: 1954,
      pages: 352,
      genres: ['Fantasy'],
      description: 'The Two Towers is a fantasy novel by J.R.R. Tolkien. It is the second book in The Lord of the Rings trilogy and continues the epic tale of the struggle against the dark lord Sauron.'
    },
    {
      title: 'The Return of the King',
      author: 'J.R.R. Tolkien',
      year: 1955,
      pages: 416,
      genres: ['Fantasy'],
      description: 'The Return of the King is a fantasy novel by J.R.R. Tolkien. It is the third and final book in The Lord of the Rings trilogy, concluding the epic story of the Ring and the fate of Middle-earth.'
    },
    {
    title: 'Mistborn: The Final Empire',
    author: 'Brandon Sanderson',
    year: 2006,
    pages: 541,
    genres: ['Fantasy'],
    description: 'Mistborn: The Final Empire is a fantasy novel by Brandon Sanderson. It is the first book in the Mistborn series and is set in a world where the Dark Lord has triumphed, and a young street thief discovers her magical abilities.'
  },
  {
    title: 'A Game of Thrones',
    author: 'George R.R. Martin',
    year: 1996,
    pages: 694,
    genres: ['Fantasy'],
    description: 'A Game of Thrones is a fantasy novel by George R.R. Martin. It is the first book in the A Song of Ice and Fire series and is known for its complex characters and political intrigue in the fictional land of Westeros.'
  },
  {
    title: 'Good Omens',
    author: 'Neil Gaiman, Terry Pratchett',
    year: 1990,
    pages: 383,
    genres: ['Fantasy', 'Humor'],
    description: 'Good Omens is a fantasy novel by Neil Gaiman and Terry Pratchett. It is a humorous take on the apocalypse, featuring an angel and a demon who team up to prevent the end of the world.'
  },
  {
    title: 'The Gunslinger',
    author: 'Stephen King',
    year: 1982,
    pages: 231,
    genres: ['Dark Fantasy', 'Western'],
    description: 'The Gunslinger is the first book in The Dark Tower series by Stephen King. It follows the quest of Roland Deschain, the last Gunslinger, as he pursues the mysterious Man in Black across a desolate world.'
  },
  {
    title: 'The Drawing of the Three',
    author: 'Stephen King',
    year: 1987,
    pages: 399,
    genres: ['Dark Fantasy', 'Western'],
    description: 'The Drawing of the Three is the second book in The Dark Tower series by Stephen King. Roland continues his journey, drawing companions from different worlds to join him in his quest for the Dark Tower.'
  },
  {
    title: 'The Waste Lands',
    author: 'Stephen King',
    year: 1991,
    pages: 422,
    genres: ['Dark Fantasy', 'Western'],
    description: 'The Waste Lands is the third book in The Dark Tower series by Stephen King. Roland and his ka-tet face challenges in Mid-World and must navigate the dangers of a wasteland on their way to the Dark Tower.'
  },
  {
    title: 'Wizard and Glass',
    author: 'Stephen King',
    year: 1997,
    pages: 787,
    genres: ['Dark Fantasy', 'Western'],
    description: 'Wizard and Glass is the fourth book in The Dark Tower series by Stephen King. It delves into Roland\'s past and the tragic events that shaped him as the gunslinger.'
  },
  {
    title: 'The Wolves of the Calla',
    author: 'Stephen King',
    year: 2003,
    pages: 714,
    genres: ['Dark Fantasy', 'Western'],
    description: 'The Wolves of the Calla is the fifth book in The Dark Tower series by Stephen King. Roland and his ka-tet become embroiled in the affairs of a town facing a threat from mysterious wolves.'
  },
  {
    title: 'Song of Susannah',
    author: 'Stephen King',
    year: 2004,
    pages: 432,
    genres: ['Dark Fantasy', 'Western'],
    description: 'Song of Susannah is the sixth book in The Dark Tower series by Stephen King. The ka-tet faces challenges, and Susannah plays a pivotal role in the quest for the Dark Tower.'
  },
  {
    title: 'The Dark Tower',
    author: 'Stephen King',
    year: 2004,
    pages: 1050,
    genres: ['Dark Fantasy', 'Western'],
    description: 'The Dark Tower is the seventh and final book in The Dark Tower series by Stephen King. Roland and his ka-tet reach the Dark Tower, facing the culmination of their quest and the fate of Mid-World.'
  },
  {
    title: 'The Wise Man\'s Fear',
    author: 'Patrick Rothfuss',
    year: 2011,
    pages: 994,
    genres: ['Fantasy'],
    description: 'The Wise Man\'s Fear is the second book in The Kingkiller Chronicle series by Patrick Rothfuss. It continues the story of Kvothe, now a young man, as he recounts his adventures and encounters with magic, love, and dangerous foes.'
  },
  {
    title: 'The Narrow Road Between Desires',
    author: 'Patrick Rothfuss',
    year: '2023',
    pages: '240',
    genres: ['Fantasy'],
    description: '#1 New York Times-bestselling phenomenon Patrick Rothfuss returns to the wildly popular Kingkiller Chronicle universe with a stunning reimagining of "The Lightning Tree." Expanded to twice its previous length and lavishly illustrated by Nathan Taylor, this touching stand-alone story is sure to please new readers and veteran Rothfuss fans alike.'
  },
  {
    title: 'Legends & Lattes',
    author: 'Travis Baldree',
    year: '2022',
    pages: '296',
    genres: ['Fantasy', 'Adventure'],
    description: 'After a lifetime of bounties and bloodshed, Viv is hanging up her sword for the last time.'
  },
  {
    title: 'Bookshops & Bonedust',
    author: 'Travis Baldree',
    year: '2023',
    pages: '352',
    genres: ['Fantasy', 'Adventure'],
    description: 'When an injury throws a young, battle-hungry orc off her chosen path, she may find that what we need isn\'t always what we seek.'
  },
  {
    title: 'Red Rising',
    author: 'Pierce Brown',
    year: 2014,
    pages: 382,
    genres: ['Fantasy', 'Dystopian'],
    description: 'Red Rising is the first book in the Red Rising Saga by Pierce Brown. It is a science fiction novel set in a dystopian future where society is divided into color-coded castes. The story follows Darrow, a Red, as he infiltrates the Gold elite to bring about revolution.'
  },
  {
    title: 'Golden Son',
    author: 'Pierce Brown',
    year: 2015,
    pages: 464,
    genres: ['Fantasy', 'Dystopian'],
    description: 'Golden Son is the second book in the Red Rising Saga by Pierce Brown. It continues the story of Darrow as he navigates the political intrigue and battles within the Gold society, facing new challenges and betrayals.'
  },
  {
    title: 'Morning Star',
    author: 'Pierce Brown',
    year: 2016,
    pages: 518,
    genres: ['Fantasy', 'Dystopian'],
    description: 'Morning Star is the third book in the Red Rising Saga by Pierce Brown. In this thrilling conclusion to the trilogy, Darrow leads the revolution against the Golds, facing epic battles and making sacrifices to achieve freedom.'
  },
  {
    title: 'Iron Gold',
    author: 'Pierce Brown',
    year: 2018,
    pages: 596,
    genres: ['Fantasy', 'Dystopian'],
    description: 'Iron Gold is the first book in the Iron Gold Trilogy, a sequel series to the Red Rising Saga by Pierce Brown. Set ten years after the events of Morning Star, it explores the consequences of the revolution and introduces new perspectives and characters.'
  },
  {
    title: 'Dark Age',
    author: 'Pierce Brown',
    year: 2019,
    pages: 800,
    genres: ['Fantasy', 'Dystopian'],
    description: 'Dark Age is the fifth book in the Red Rising Saga by Pierce Brown. It continues the story of Darrow and the struggle for power in the solar system. The stakes are higher, and the battles more intense as the characters face the consequences of their actions.'
  },
  {
    title: 'Light Bringer',
    author: 'Pierce Brown',
    year: '2023',
    pages: '682',
    genres: ['Fantasy', 'Dystopian'],
    description: 'Darrow returns as Pierce Brown’s New York Times bestselling Red Rising series continues in the thrilling sequel to Dark Age.'
  },
  ];
  
  filteredBooks: any[] = [];

  constructor(private router: Router,private dialog: MatDialog, private route: ActivatedRoute) {
    this.route.paramMap.subscribe({
      next: params => {
        const query = params.get('filter');
        if(query!==null){
          this.searchTerm = query;
          this.search();
        }
      }
    })
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

  showBookDetails(book: any): void {
    this.dialog.open(BookDescriptionComponent, {
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
}