package com.app.exception;

import com.app.dto.EmailRequest;
import com.app.dto.LoginRequest;


public class UserNotFound extends RuntimeException{
    public UserNotFound(Integer id){
        super("User Not Found with id " + id);     // this custom exceptions goes till throwable class in flow.
    }

    public UserNotFound(EmailRequest emailRequest) {
        super("User Not Found with Email " + emailRequest.getEmail());
    }

    public UserNotFound(String text){
        super(text);
    }

    public UserNotFound(LoginRequest loginRequest) {
        super("User Not Found with Email " + loginRequest.getEmail());
    }
}

