package com.app.exception;

public class DriveNotFound extends RuntimeException {
    public DriveNotFound(String message) {
        super(message);
    }
}
