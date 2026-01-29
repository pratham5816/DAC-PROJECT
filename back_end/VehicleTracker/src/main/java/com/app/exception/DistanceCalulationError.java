package com.app.exception;


import com.app.dto.ErrorResponse;

public class DistanceCalulationError extends RuntimeException {
    public DistanceCalulationError(String message) {
        super(message);
    }
}
