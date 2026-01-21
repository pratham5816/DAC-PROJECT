package com.app.controller;


import com.app.dto.LoginRequest;
import com.app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("Auth")
public class AuthController {


    @Autowired
    private AuthService authService;

    @PostMapping("/UserLogin")
    public boolean loginUser(@RequestBody LoginRequest loginRequest) {
        return authService.authenticateUser(loginRequest);
    }


    @PostMapping("/DriverLogin")
    public boolean customerLogin(@RequestBody LoginRequest loginRequest) {
        return authService.authenticateDriver(loginRequest);
    }

}
