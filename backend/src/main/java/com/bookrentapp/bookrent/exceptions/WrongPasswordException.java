package com.bookrentapp.bookrent.exceptions;

public class WrongPasswordException extends Exception {
    public WrongPasswordException()
    {
        super("wrong_password");
    }
}
