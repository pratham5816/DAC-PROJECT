package com.app.exception;

public class UserAlreadyExists extends RuntimeException{
    public UserAlreadyExists(String email){
        super("User Already Exists : " + email);
    }
}
