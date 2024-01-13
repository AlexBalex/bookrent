package com.bookrentapp.bookrent.exceptions;

public class UserNotFoundException extends Exception {
    public UserNotFoundException()
    {
        super("user_not_found");
    }
}
