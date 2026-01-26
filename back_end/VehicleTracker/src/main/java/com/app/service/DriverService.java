package com.app.service;

import com.app.dto.EmailRequest;
import com.app.dto.RegisterDriverResponse;
import com.app.exception.DriveAlreadyExists;
import com.app.exception.DriverAlreadyExists;
import com.app.exception.DriverNotFound;
import com.app.model.Driver;
import com.app.repository.DriveRepository;
import com.app.repository.DriverRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    private final DriverRepository driverRepository;
    private final PasswordEncoder passwordEncoder;
    private final DriveRepository driveRepository;

    public DriverService(DriverRepository driverRepository , PasswordEncoder passwordEncoder, DriveRepository driveRepository) {
        this.driverRepository = driverRepository;
        this.passwordEncoder = passwordEncoder;
        this.driveRepository = driveRepository;
    }

    public RegisterDriverResponse registerDriver(Driver driver) {

        Optional<Driver> temp = driverRepository.findByEmail(driver.getEmail());
        if(temp.isPresent()) throw  new DriverAlreadyExists("Driver already exists with email " + driver.getEmail());
        driver.setPassword(passwordEncoder.encode(driver.getPassword()));
        driverRepository.save(driver);

        return new RegisterDriverResponse(driver.getDriverId(), driver.getDriverName(), driver.getLicenseNumber(), driver.getEmail());
    }

    public Driver getDriver(EmailRequest emailRequest) {
        Optional<Driver> driver = driverRepository.findByEmail(emailRequest.getEmail());
        if(driver.isEmpty()) throw new DriverNotFound("Driver not found with email " + emailRequest.getEmail());
        return driver.get();
    }

}
