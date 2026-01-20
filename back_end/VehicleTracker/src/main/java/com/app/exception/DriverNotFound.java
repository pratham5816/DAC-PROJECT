package com.app.exception;

public class DriverNotFound extends RuntimeException {
  public DriverNotFound(String message) {
    super(message);
  }
}
