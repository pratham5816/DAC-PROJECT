package com.app.exception;

import com.app.dto.ErrorResponse;

public class DriveNotFound extends RuntimeException {
    public DriveNotFound(String message) {
        super(message);
    }
    public DriveNotFound(ErrorResponse errorResponse) {
        super(errorResponse.getError());
    }
}
