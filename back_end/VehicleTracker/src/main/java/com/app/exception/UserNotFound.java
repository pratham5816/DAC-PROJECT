package com.app.exception;

public class UserNotFound extends RuntimeException{
    public UserNotFound(String id){
        super("User Not Found with id " + id);     // this custom exceptions goes till throwable class in flow.
    }
}

