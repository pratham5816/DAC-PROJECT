package com.app.exception;

public class CustomerNotFound extends RuntimeException{
    public CustomerNotFound(int id){
        super("The customer with id " + id + " not exist!");
    }
}
