package com.bookrentapp.bookrent.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookrentapp.bookrent.dto.request.RegisterDto;
import com.bookrentapp.bookrent.dto.response.EmailDto;
import com.bookrentapp.bookrent.entities.User;
import com.bookrentapp.bookrent.exceptions.EmailAlreadyExistsException;
import com.bookrentapp.bookrent.exceptions.UserNotFoundException;
import com.bookrentapp.bookrent.exceptions.WrongPasswordException;
import com.bookrentapp.bookrent.repositories.UserRepository;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    public EmailDto login(String email, String password) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty())
            throw new UserNotFoundException();

        if (!user.get().getPassword().equals(password))
            throw new WrongPasswordException();

        return new EmailDto(user.get().getEmail());
    }

    public EmailDto register(RegisterDto registerDto) throws Exception {
        // Check if the email is already registered
        Optional<User> existingUser = userRepository.findByEmail(registerDto.getEmail());
        if (existingUser.isPresent()) {
            throw new EmailAlreadyExistsException();
        }

        // Create a new user
        User newUser = new User();
        newUser.setEmail(registerDto.getEmail());
        newUser.setPassword(registerDto.getPassword());
        // newUser.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        // Save the new user
        userRepository.save(newUser);

        // Return a response
        return new EmailDto(newUser.getEmail());
    }
}