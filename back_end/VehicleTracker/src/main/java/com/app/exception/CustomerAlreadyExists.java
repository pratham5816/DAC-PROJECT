package com.app.exception;

public class CustomerAlreadyExists extends RuntimeException {
    public CustomerAlreadyExists(String email){
        super("The Customer already exists with email " + email);
    }
}
