package com.app.exception;

import com.app.dto.LoginRequest;

public class UserNotFound extends RuntimeException{
    public UserNotFound(String id){
        super("User Not Found with id " + id);     // this custom exceptions goes till throwable class in flow.
    }

    public UserNotFound(LoginRequest loginRequest) {
        super("User Not Found with Email " + loginRequest.getEmail());
    }
}

