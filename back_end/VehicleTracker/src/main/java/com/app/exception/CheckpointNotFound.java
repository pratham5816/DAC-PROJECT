package com.app.exception;

public class CheckpointNotFound extends RuntimeException {
    public CheckpointNotFound(String checkpointName) {
        super("Checkpoint Not Found with name " + checkpointName);
    }
}
