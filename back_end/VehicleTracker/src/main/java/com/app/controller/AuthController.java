package com.app.controller;


import com.app.dto.LoginRequest;
import com.app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
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


    @Autowired
    private AuthService authService;

    @PostMapping("/UserLogin")
    public ResponseEntity<?> userLogin(@RequestBody LoginRequest loginRequest) {
        boolean valid = authService.authenticateUser(loginRequest);

        if(!valid) return ResponseEntity.status(401).body("Invalid credentials");

        return ResponseEntity.ok(loginRequest);
    }


    @PostMapping("/DriverLogin")
    public ResponseEntity<?> driverLogin(@RequestBody LoginRequest loginRequest) {

        boolean valid = authService.authenticateDriver(loginRequest);

        if(!valid) return ResponseEntity.status(401).body("Invalid credentials");

        return ResponseEntity.ok(loginRequest);
    }


}
