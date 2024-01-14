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
    // @Autowired
    // private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize data here
        initializeUsers();
        initializeBooks();
    }

    private void initializeUsers() {
        // Check if users already exist
        if (userRepository.count() == 0) {
            // Create and save sample users
            createUser("user1@mail.com", "p1");
            createUser("user2@mail.com", "p2");
            // Add more users as needed
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
                new Book("The Hobbit", "J.R.R. Tolkien","1937","310","Fantasy,Adventure","The Hobbit is a fantasy novel by J.R.R. Tolkien. It follows the journey of Bilbo Baggins, a hobbit who is reluctantly swept into an epic quest to reclaim the lost Dwarf Kingdom of Erebor from the dragon Smaug."),
                new Book("The Lion, the Witch and the Wardrobe", "C.S. Lewis","1950","208","Fantasy","The Lion, the Witch and the Wardrobe is a fantasy novel by C.S. Lewis. It is the first book in The Chronicles of Narnia series and tells the story of four siblings who discover a magical world through a wardrobe.")
                // Add more books as needed
        );
        bookRepository.saveAll(books);
    }
}
