package com.app.exception;


import com.app.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CheckpointAlreadyExists.class)
    public ResponseEntity<String> handlerCheckpointAlreadyExists(CheckpointAlreadyExists ex){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
    @ExceptionHandler(CheckpointNotFound.class)
    public ResponseEntity<String> handleCheckpointNotFound(Exception ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<String> handlerUserNotFound(UserNotFound ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(UserAlreadyExists.class)
    public ResponseEntity<String> handlerUserAlreadyExists(UserAlreadyExists ex){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(CustomerNotFound.class)
    public ResponseEntity<String> handlerCustomerNotFound(CustomerNotFound ex)
    {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(CustomerAlreadyExists.class)
    public ResponseEntity<String> handlerCustomerAlreadyExists(CustomerAlreadyExists ex){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(VehicleAlreadyExists.class)
    public ResponseEntity<String> handlerVehicleAlreadyExists(VehicleAlreadyExists ex){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(VehicleNotFound.class)
    public ResponseEntity<String> handlerVehicleNotFound(VehicleNotFound ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidCredential.class)
    public ResponseEntity<String> handlerInvalidCredential(InvalidCredential ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(DriveNotFound.class)
    public ResponseEntity<String> handlerDriveNotFound(DriveNotFound ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(UnexpectedException.class)
    public ResponseEntity<String> handlerDriverNotFound(DriverNotFound ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

    @ExceptionHandler(LocationNotUpdatedByDriver.class)
    public ResponseEntity<String> handlerLocationNotUpdatedByDriver(LocationNotUpdatedByDriver ex){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(DriverIsAlreadyActive.class)
    public ResponseEntity<?> handlerDriverIsAlreadyActive(DriverIsAlreadyActive ex){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(ex.getMessage()));
    }
}
