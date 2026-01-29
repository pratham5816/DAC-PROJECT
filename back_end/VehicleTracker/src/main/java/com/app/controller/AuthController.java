package com.app.controller;


import com.app.dto.LoginRequest;
import com.app.dto.LoginResponse;
import com.app.exception.CustomerNotFound;
import com.app.exception.DriverNotFound;
import com.app.exception.UserNotFound;
import com.app.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }     // constructor injection



    @PostMapping("/user/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginRequest loginRequest) {

        boolean valid = authService.authenticateUser(loginRequest);

        if(!valid) throw new UserNotFound("invalid credentials");

        return ResponseEntity.ok().body(new LoginResponse(loginRequest.getEmail()));
    }


    @PostMapping("/driver/login")
    public ResponseEntity<?> driverLogin(@RequestBody LoginRequest loginRequest) {

        boolean valid = authService.authenticateDriver(loginRequest);

        if(!valid) throw new DriverNotFound("invalid credentials");

        return ResponseEntity.ok(new LoginResponse(loginRequest.getEmail()));
    }

    @PostMapping("/customer/login")
    public ResponseEntity<?> customerLogin(@RequestBody LoginRequest loginRequest) {
        boolean valid = authService.authenticateCustomer(loginRequest);

        if(!valid) throw new CustomerNotFound("invalid credentials");

        return ResponseEntity.ok(new LoginResponse(loginRequest.getEmail()));
    }

}
