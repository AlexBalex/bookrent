package com.bookrentapp.bookrent.utils;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.bookrentapp.bookrent.entities.Book;
import com.bookrentapp.bookrent.entities.User;
import com.bookrentapp.bookrent.repositories.BookRepository;
import com.bookrentapp.bookrent.repositories.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize data here
        initializeUsers();
        initializeBooks();
    }

    private void initializeUsers() {
        // Check if users already exist
        if (userRepository.count() == 0) {
            createUser("user1@mail.com", "p1");
            createUser("user2@mail.com", "p2");
        }
    }

    private void createUser(String email, String password) {
        User user = new User();
        user.setEmail(email);

        user.setPassword(password);
        userRepository.save(user);
    }

    private void initializeBooks() {
        List<Book> books = Arrays.asList(
            new Book("The Hobbit", "J.R.R. Tolkien", "1937", "310", "Fantasy, Adventure",  "The Hobbit is a fantasy novel by J.R.R. Tolkien. It follows the journey of Bilbo Baggins, a hobbit who is reluctantly swept into an epic quest to reclaim the lost Dwarf Kingdom of Erebor from the dragon Smaug."),
            new Book("The Lion, the Witch and the Wardrobe", "C.S. Lewis", "1950", "208", "Fantasy","The Lion, the Witch and the Wardrobe is a fantasy novel by C.S. Lewis. It is the first book in The Chronicles of Narnia series and tells the story of four siblings who discover a magical world through a wardrobe."),
            new Book("The Name of the Wind", "Patrick Rothfuss", "2007", "662", "Fantasy", "The Name of the Wind is a fantasy novel by Patrick Rothfuss. It is the first book in The Kingkiller Chronicle series and follows the life of Kvothe, a magically gifted young man who grows to be the most notorious wizard his world has ever seen."),
            new Book("The Lies of Locke Lamora", "Scott Lynch", "2006", "499", "Fantasy, Adventure", "The Lies of Locke Lamora is a fantasy novel by Scott Lynch. It follows the exploits of a group of con artists known as the Gentlemen Bastards in the city of Camorr."),
            new Book("The Eye of the World", "Robert Jordan", "1990", "684", "Fantasy, Adventure", "The Eye of the World is a fantasy novel by Robert Jordan. It is the first book in The Wheel of Time series and follows a young man named Rand al\'Thor as he embarks on a journey to save the world from an ancient evil."),
            new Book("The Way of Kings", "Brandon Sanderson", "2010", "1007", "Fantasy", "The Way of Kings is a fantasy novel by Brandon Sanderson. It is the first book in The Stormlight Archive series and explores the stories of several characters in a world torn by magical storms and war."),
            new Book("The Shadow of the Gods", "John Gwynne", "2021", "496", "Fantasy", "The Shadow of the Gods is a fantasy novel by John Gwynne. It is set in a world inspired by Norse mythology and follows the stories of three protagonists as they navigate a land filled with monsters, gods, and secrets."),
            new Book("The Fellowship of the Ring", "J.R.R. Tolkien", "1954", "423", "Fantasy", "The Fellowship of the Ring is a fantasy novel by J.R.R. Tolkien. It is the first book in The Lord of the Rings trilogy and follows the journey of a young hobbit named Frodo Baggins as he sets out to destroy a powerful ring."),
            new Book("The Two Towers", "J.R.R. Tolkien", "1954", "352", "Fantasy", "The Two Towers is a fantasy novel by J.R.R. Tolkien. It is the second book in The Lord of the Rings trilogy and continues the epic tale of the struggle against the dark lord Sauron."),
            new Book("The Return of the King", "J.R.R. Tolkien", "1955", "416", "Fantasy", "The Return of the King is a fantasy novel by J.R.R. Tolkien. It is the third and final book in The Lord of the Rings trilogy, concluding the epic story of the Ring and the fate of Middle-earth."),
            new Book("Mistborn: The Final Empire", "Brandon Sanderson", "2006", "541", "Fantasy", "Mistborn: The Final Empire is a fantasy novel by Brandon Sanderson. It is the first book in the Mistborn series and is set in a world where the Dark Lord has triumphed, and a young street thief discovers her magical abilities."),
            new Book("A Game of Thrones", "George R.R. Martin", "1996", "694", "Fantasy", "A Game of Thrones is a fantasy novel by George R.R. Martin. It is the first book in the A Song of Ice and Fire series and is known for its complex characters and political intrigue in the fictional land of Westeros."),
            new Book("Good Omens", "Neil Gaiman, Terry Pratchett", "1990", "383", "Fantasy, Humor", "Good Omens is a fantasy novel by Neil Gaiman and Terry Pratchett. It is a humorous take on the apocalypse, featuring an angel and a demon who team up to prevent the end of the world."),
            new Book("The Gunslinger", "Stephen King", "1982", "231", "Dark Fantasy, Western","The Gunslinger is the first book in The Dark Tower series by Stephen King. It follows the quest of Roland Deschain, the last Gunslinger, as he pursues the mysterious Man in Black across a desolate world."),
            new Book("The Drawing of the Three", "Stephen King", "1987", "399", "Dark Fantasy, Western", "The Drawing of the Three is the second book in The Dark Tower series by Stephen King. Roland continues his journey, drawing companions from different worlds to join him in his quest for the Dark Tower."),
            new Book("The Waste Lands", "Stephen King", "1991", "422", "Dark Fantasy, Western", "The Waste Lands is the third book in The Dark Tower series by Stephen King. Roland and his ka-tet face challenges in Mid-World and must navigate the dangers of a wasteland on their way to the Dark Tower."),
            new Book("Wizard and Glass", "Stephen King", "1997","787", "Dark Fantasy, Western", "Wizard and Glass is the fourth book in The Dark Tower series by Stephen King. It delves into Roland\'s past and the tragic events that shaped him as the gunslinger."),
            new Book("The Wolves of the Calla", "Stephen King", "2003", "714", "Dark Fantasy, Western", "The Wolves of the Calla is the fifth book in The Dark Tower series by Stephen King. Roland and his ka-tet become embroiled in the affairs of a town facing a threat from mysterious wolves."),
            new Book("Song of Susannah", "Stephen King", "2004", "432", "Dark Fantasy, Western", "Song of Susannah is the sixth book in The Dark Tower series by Stephen King. The ka-tet faces challenges, and Susannah plays a pivotal role in the quest for the Dark Tower."),
            new Book("The Dark Tower", "Stephen King", "2004", "1050", "Dark Fantasy, Western", "The Dark Tower is the seventh and final book in The Dark Tower series by Stephen King. Roland and his ka-tet reach the Dark Tower, facing the culmination of their quest and the fate of Mid-World."),
            new Book("The Wise Man\'s Fear", "Patrick Rothfuss", "2011", "994", "Fantasy", "The Wise Man\'s Fear is the second book in The Kingkiller Chronicle series by Patrick Rothfuss. It continues the story of Kvothe, now a young man, as he recounts his adventures and encounters with magic, love, and dangerous foes."),
            new Book("The Narrow Road Between Desires", "Patrick Rothfuss", "2023", "240", "Fantasy", "#1 New York Times-bestselling phenomenon Patrick Rothfuss returns to the wildly popular Kingkiller Chronicle universe with a stunning reimagining of The Lightning Tree. Expanded to twice its previous length and lavishly illustrated by Nathan Taylor, this touching stand-alone story is sure to please new readers and veteran Rothfuss fans alike."),
            new Book("Legends & Lattes", "Travis Baldree", "2022", "296", "Fantasy, Adventure", "After a lifetime of bounties and bloodshed, Viv is hanging up her sword for the last time."),
            new Book("Bookshops & Bonedust", "Travis Baldree", "2023", "352", "Fantasy, Adventure", "When an injury throws a young, battle-hungry orc off her chosen path, she may find that what we need isn\'t always what we seek."),
            new Book("Red Rising", "Pierce Brown", "2014", "382", "Fantasy, Dystopian", "Red Rising is the first book in the Red Rising Saga by Pierce Brown. It is a science fiction novel set in a dystopian future where society is divided into color-coded castes. The story follows Darrow, a Red, as he infiltrates the Gold elite to bring about revolution."),
            new Book("Golden Son", "Pierce Brown", "2015", "464", "Fantasy, Dystopian", "Golden Son is the second book in the Red Rising Saga by Pierce Brown. It continues the story of Darrow as he navigates the political intrigue and battles within the Gold society, facing new challenges and betrayals."),
            new Book("Morning Star", "Pierce Brown", "2016", "518", "Fantasy, Dystopian", "Morning Star is the third book in the Red Rising Saga by Pierce Brown. In this thrilling conclusion to the trilogy, Darrow leads the revolution against the Golds, facing epic battles and making sacrifices to achieve freedom."),
            new Book("Iron Gold", "Pierce Brown", "2018", "596", "Fantasy, Dystopian", "Iron Gold is the first book in the Iron Gold Trilogy, a sequel series to the Red Rising Saga by Pierce Brown. Set ten years after the events of Morning Star, it explores the consequences of the revolution and introduces new perspectives and characters."),
            new Book("Dark Age", "Pierce Brown", "2019", "800", "Fantasy, Dystopian", "Dark Age is the fifth book in the Red Rising Saga by Pierce Brown. It continues the story of Darrow and the struggle for power in the solar system. The stakes are higher, and the battles more intense as the characters face the consequences of their actions."),
            new Book("Light Bringer", "Pierce Brown", "2023", "682", "Fantasy, Dystopian", "Darrow returns as Pierce Brown's New York Times bestselling Red Rising series continues in the thrilling sequel to Dark Age.")
        );
        bookRepository.saveAll(books);
    }
}
