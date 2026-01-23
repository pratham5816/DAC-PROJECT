package com.app.exception;

public class DriveAlreadyExists extends RuntimeException {
    public DriveAlreadyExists(String message) {
        super(message);
    }
}
