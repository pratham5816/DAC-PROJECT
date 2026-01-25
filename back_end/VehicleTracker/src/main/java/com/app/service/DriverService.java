package com.app.service;

import com.app.exception.DriveAlreadyExists;
import com.app.model.Driver;
import com.app.repository.DriverRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DriverService {

    private final DriverRepository driverRepository;
    private final PasswordEncoder passwordEncoder;
    public DriverService(DriverRepository driverRepository , PasswordEncoder passwordEncoder) {
        this.driverRepository = driverRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerDriver(Driver driver) {
        if(driverRepository.findByEmail(driver.getEmail()) != null) throw new DriveAlreadyExists("Driver with email "+ driver.getEmail() + " already exists");
        driver.setPassword(passwordEncoder.encode(driver.getPassword()));
        driverRepository.save(driver);
    }

}
