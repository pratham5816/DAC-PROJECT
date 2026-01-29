package com.app.controller;


import com.app.dto.LoginRequest;
import com.app.dto.LoginResponse;
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
    public ResponseEntity<LoginResponse> userLogin(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok().body(authService.authenticateUser(loginRequest));
    }


    @PostMapping("/driver/login")
    public ResponseEntity<LoginResponse> driverLogin(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateDriver(loginRequest));
    }

    @PostMapping("/customer/login")
    public ResponseEntity<LoginResponse> customerLogin(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateCustomer(loginRequest));
    }

}
