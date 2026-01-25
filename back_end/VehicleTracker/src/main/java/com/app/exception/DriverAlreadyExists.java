package com.app.exception;

public class DriverAlreadyExists extends RuntimeException {
    public DriverAlreadyExists(String message) {
        super(message);
    }
}
