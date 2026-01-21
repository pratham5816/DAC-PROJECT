package com.app.service;

import com.app.dto.LoginRequest;
import com.app.exception.DriverNotFound;
import com.app.exception.UserNotFound;
import com.app.model.Driver;
import com.app.model.User;
import com.app.repository.DriverRepository;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DriverRepository driverRepository;


    public boolean authenticateUser(LoginRequest loginRequest) {
        // Authentication logic for user
        List<User> temp =  userRepository.findByEmail(loginRequest.getEmail());

        if(temp.isEmpty()) throw new UserNotFound(loginRequest);

        // Add password verification logic here
        // will be adding later

        User user = temp.get(0);

        if(user.getPassword().equals(loginRequest.getPassword())) {
            return true;
        }else{
            return false;
        }
    }

    public boolean authenticateDriver(LoginRequest loginRequest) {
        // Authentication logic for driver
        List<Driver> temp =  driverRepository.findByEmail(loginRequest.getEmail());

        if(temp.isEmpty()) throw new DriverNotFound(loginRequest);

        // Add password verification logic here
        // will be adding later

        Driver driver = temp.get(0);

        if(driver.getPassword().equals(loginRequest.getPassword())) {
//            System.out.println("Driver authenticated: " + driver.getEmail());
            System.out.println("From Object" + driver.getPassword());
            System.out.println("From Api" + loginRequest.getPassword());
            return true;
        }else{
            return false;
        }
    }



}
