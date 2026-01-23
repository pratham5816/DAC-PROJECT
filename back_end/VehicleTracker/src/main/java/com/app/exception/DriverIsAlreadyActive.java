package com.app.exception;

public class DriverIsAlreadyActive extends RuntimeException {
    public DriverIsAlreadyActive(String message) {
        super(message);
    }
}
