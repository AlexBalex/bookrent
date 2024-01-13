package com.bookrentapp.bookrent.utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.bookrentapp.bookrent.entities.User;
import com.bookrentapp.bookrent.repositories.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize data here
        initializeUsers();
    }

    private void initializeUsers() {
        // Check if users already exist
        if (userRepository.count() == 0) {
            // Create and save sample users
            createUser("user1", "password1");
            createUser("user2", "password2");
            // Add more users as needed
        }
    }

    private void createUser(String email, String password) {
        User user = new User();
        user.setEmail(email);

        user.setPassword(password);
        userRepository.save(user);
    }
}
