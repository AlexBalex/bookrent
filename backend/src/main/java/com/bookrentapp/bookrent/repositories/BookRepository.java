package com.bookrentapp.bookrent.repositories;

import com.bookrentapp.bookrent.entities.Book;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAll();
}
