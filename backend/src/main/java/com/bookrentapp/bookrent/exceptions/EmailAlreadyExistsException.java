package com.bookrentapp.bookrent.exceptions;

public class EmailAlreadyExistsException extends Exception {
    public EmailAlreadyExistsException()
    {
        super("email_already_in_use");
    }
    
}
