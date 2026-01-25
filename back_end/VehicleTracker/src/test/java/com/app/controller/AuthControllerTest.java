package com.app.controller;

// File: src/test/java/com/app/controller/AuthControllerTest.java

import com.app.dto.LoginRequest;
import com.app.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @org.junit.jupiter.api.Test
    void userLogin_ReturnsOk_WhenCredentialsAreValid() {
        LoginRequest request = new LoginRequest();
        when(authService.authenticateUser(request)).thenReturn(true);

        ResponseEntity<?> response = authController.userLogin(request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(request, response.getBody());
    }

    @org.junit.jupiter.api.Test
    void userLogin_ReturnsUnauthorized_WhenCredentialsAreInvalid() {
        LoginRequest request = new LoginRequest();
        when(authService.authenticateUser(request)).thenReturn(false);

        ResponseEntity<?> response = authController.userLogin(request);

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Invalid credentials", response.getBody());
    }

    @org.junit.jupiter.api.Test
    void driverLogin_ReturnsOk_WhenCredentialsAreValid() {
        LoginRequest request = new LoginRequest();
        when(authService.authenticateDriver(request)).thenReturn(true);

        ResponseEntity<?> response = authController.driverLogin(request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(request, response.getBody());
    }

    @org.junit.jupiter.api.Test
    void driverLogin_ReturnsUnauthorized_WhenCredentialsAreInvalid() {
        LoginRequest request = new LoginRequest();
        when(authService.authenticateDriver(request)).thenReturn(false);

        ResponseEntity<?> response = authController.driverLogin(request);

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Invalid credentials", response.getBody());
    }
}
