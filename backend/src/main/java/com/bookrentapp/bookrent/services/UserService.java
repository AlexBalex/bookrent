package com.bookrentapp.bookrent.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookrentapp.bookrent.dto.response.EmailDto;
import com.bookrentapp.bookrent.entities.User;
import com.bookrentapp.bookrent.exceptions.UserNotFoundException;
import com.bookrentapp.bookrent.exceptions.WrongPasswordException;
import com.bookrentapp.bookrent.repositories.UserRepository;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public EmailDto login(String email, String password) throws Exception
    {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty()) throw new UserNotFoundException();

        if(!user.get().getPassword().equals(password)) throw new WrongPasswordException();

        return new EmailDto(user.get().getEmail());
    }
}