package com.app.service;

import com.app.dto.EmailRequest;
import com.app.exception.DriveAlreadyExists;
import com.app.exception.DriverNotFound;
import com.app.model.Driver;
import com.app.repository.DriveRepository;
import com.app.repository.DriverRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public void registerDriver(Driver driver) {
        if(driverRepository.findByEmail(driver.getEmail()) != null) throw new DriveAlreadyExists("Driver with email "+ driver.getEmail() + " already exists");
        driver.setPassword(passwordEncoder.encode(driver.getPassword()));
        driverRepository.save(driver);
    }

    public Driver getDriver(EmailRequest emailRequest) {
        List<Driver> driver = driverRepository.findByEmail(emailRequest.getEmail());
        if(driver.isEmpty()) throw new DriverNotFound("Driver not found with email " + emailRequest.getEmail());
        return driver.get(0);
    }

}
