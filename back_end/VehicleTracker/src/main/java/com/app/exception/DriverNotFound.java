package com.app.exception;

import com.app.dto.LoginRequest;

public class DriverNotFound extends RuntimeException {
    public DriverNotFound(LoginRequest loginRequest)
    {
        super("Driver Not Found with Email " + loginRequest.getEmail());
    }
}
