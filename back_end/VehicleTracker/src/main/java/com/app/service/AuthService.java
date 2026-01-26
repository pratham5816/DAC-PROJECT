package com.app.service;

import com.app.dto.LoginRequest;
import com.app.exception.CustomerNotFound;
import com.app.exception.DriverNotFound;
import com.app.exception.UserNotFound;
import com.app.model.Customer;
import com.app.model.Driver;
import com.app.model.User;
import com.app.repository.CustomerRepository;
import com.app.repository.DriverRepository;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final DriverRepository driverRepository;

    private final CustomerRepository customerRepository;

    public AuthService(PasswordEncoder passwordEncoder , UserRepository userRepository, DriverRepository driverRepository , CustomerRepository customerRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.driverRepository = driverRepository;
        this.customerRepository = customerRepository;
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

        Optional<Driver> temp =  driverRepository.findByEmail(loginRequest.getEmail());

        if(temp.isEmpty()) throw new DriverNotFound(loginRequest);
        // Add password verification logic here
        // will be adding later

        Driver driver = temp.get();

//            System.out.println("Driver authenticated: " + driver.getEmail());
//            System.out.println("From Object" + driver.getPassword());
//            System.out.println("From Api" + loginRequest.getPassword());
        return passwordEncoder.matches(loginRequest.getPassword() , driver.getPassword());

    }

    public boolean authenticateCustomer(LoginRequest loginRequest) {

        // Authentication logic for customer

        loginRequest.setPassword(loginRequest.getPassword().trim());

        loginRequest.setEmail(loginRequest.getEmail().trim().toLowerCase());

        Optional<Customer> temp =  customerRepository.findByEmail(loginRequest.getEmail());

        if(temp.isEmpty()) throw new CustomerNotFound("Customer with email " + loginRequest.getEmail() + " not found!");

        Customer customer = temp.get();

        return passwordEncoder.matches(loginRequest.getPassword() , customer.getPassword());
    }


}
