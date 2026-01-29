package com.app.exception;


import com.app.dto.ErrorResponse;

public class CheckpointNotFound extends RuntimeException {
    public CheckpointNotFound(String message) {
        super(message);
    }
    public CheckpointNotFound(ErrorResponse errorResponse) {
        super(errorResponse.getError());
    }
}
