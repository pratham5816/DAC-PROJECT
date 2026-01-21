package com.app.exception;

public class CheckpointAlreadyExists extends RuntimeException {
    public CheckpointAlreadyExists(String checkpointName) {
        super("Checkpoint already exists with name " + checkpointName);
    }
}
