package com.app.service;

import com.app.dto.LoginRequest;
import com.app.dto.LoginResponse;
import com.app.exception.CustomerNotFound;
import com.app.exception.DriverNotFound;
import com.app.exception.InvalidCredential;
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


    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        // Authentication logic for user

        loginRequest.setPassword(loginRequest.getPassword().trim());

        loginRequest.setEmail(loginRequest.getEmail().trim().toLowerCase());

        Optional<User> temp =  userRepository.findByEmail(loginRequest.getEmail());

        if(temp.isEmpty()) throw new UserNotFound("User with email " + loginRequest.getEmail() + " not found!");

        User user = temp.get();

        if(!passwordEncoder.matches(loginRequest.getPassword() , user.getPassword())) throw new InvalidCredential("Invalid credentials provided!");

        return new LoginResponse(user.getId() , user.getEmail());
    }

    public LoginResponse authenticateDriver(LoginRequest loginRequest) {

        // Authentication logic for driver
        loginRequest.setPassword(loginRequest.getPassword().trim());    // trimming spaces

        loginRequest.setEmail(loginRequest.getEmail().trim().toLowerCase());  // trimming and converting to lowercase for uniformity

        Optional<Driver> temp =  driverRepository.findByEmail(loginRequest.getEmail());

        if(temp.isEmpty()) throw new DriverNotFound("Driver with email " + loginRequest.getEmail() + " not found!");

        Driver driver = temp.get();

        if(!passwordEncoder.matches(loginRequest.getPassword() , driver.getPassword())) throw new InvalidCredential("Invalid credentials provided!");

        return new LoginResponse(driver.getDriverId() , driver.getEmail());

    }

    public LoginResponse authenticateCustomer(LoginRequest loginRequest) {

        // Authentication logic for customer

        loginRequest.setPassword(loginRequest.getPassword().trim());

        loginRequest.setEmail(loginRequest.getEmail().trim().toLowerCase());

        Optional<Customer> temp =  customerRepository.findByEmail(loginRequest.getEmail());

        if(temp.isEmpty()) throw new CustomerNotFound("Customer with email " + loginRequest.getEmail() + " not found!");

        Customer customer = temp.get();

        if(!passwordEncoder.matches(loginRequest.getPassword() , customer.getPassword())){ throw new InvalidCredential("Invalid credentials provided!");}

        return  new LoginResponse(customer.getCustomerId() , customer.getEmail());
    }


}
