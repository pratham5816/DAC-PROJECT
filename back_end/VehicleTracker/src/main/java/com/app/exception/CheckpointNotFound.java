package com.app.exception;

public class CheckpointNotFound extends RuntimeException {
    public CheckpointNotFound(String message) {
        super(message);
    }
}
