package com.app.controller;


import com.app.dto.LoginRequest;
import com.app.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("Auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }     // constructor injection



    @PostMapping("/user/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginRequest loginRequest) {
        boolean valid = authService.authenticateUser(loginRequest);

        if(!valid) return ResponseEntity.status(401).body("Invalid credentials");

        return ResponseEntity.ok("Login successful");
    }


    @PostMapping("/driver/login")
    public ResponseEntity<?> driverLogin(@RequestBody LoginRequest loginRequest) {

        boolean valid = authService.authenticateDriver(loginRequest);

        if(!valid) return ResponseEntity.status(401).body("Invalid credentials");

        return ResponseEntity.ok("Login successful");
    }


}
