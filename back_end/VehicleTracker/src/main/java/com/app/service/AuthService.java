package com.app.service;

import com.app.dto.LoginRequest;
import com.app.exception.DriverNotFound;
import com.app.exception.UserNotFound;
import com.app.model.Driver;
import com.app.model.User;
import com.app.repository.DriverRepository;
import com.app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DriverRepository driverRepository;

    public AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        // after researching constructor injection makes more sence  rather than @autowired for mandatory dependencies
    }


    public boolean authenticateUser(LoginRequest loginRequest) {
        // Authentication logic for user

        loginRequest.setPassword(loginRequest.getPassword().trim());

        loginRequest.setEmail(loginRequest.getEmail().trim().toLowerCase());

        Optional<User> temp =  userRepository.findByEmail(loginRequest.getEmail());

        if(temp.isEmpty()) throw new UserNotFound(loginRequest);

        // Add password verification logic here
        // will be adding later

        User user = temp.get();

        return passwordEncoder.matches(loginRequest.getPassword() , user.getPassword());
    }

    public boolean authenticateDriver(LoginRequest loginRequest) {

        // Authentication logic for driver
        loginRequest.setPassword(loginRequest.getPassword().trim());    // trimming spaces

        loginRequest.setEmail(loginRequest.getEmail().trim().toLowerCase());  // trimming and converting to lowercase for uniformity

        List<Driver> temp =  driverRepository.findByEmail(loginRequest.getEmail());

        if(temp.isEmpty()) throw new DriverNotFound(loginRequest);
        // Add password verification logic here
        // will be adding later
        //
        //
        Driver driver = temp.get(0);
//            System.out.println("Driver authenticated: " + driver.getEmail());
//            System.out.println("From Object" + driver.getPassword());
//            System.out.println("From Api" + loginRequest.getPassword());
        return passwordEncoder.matches(loginRequest.getPassword() , driver.getPassword());

    }



}
