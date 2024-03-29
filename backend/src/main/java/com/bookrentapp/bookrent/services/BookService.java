package com.bookrentapp.bookrent.services;

import com.bookrentapp.bookrent.entities.Book;
import com.bookrentapp.bookrent.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

}
