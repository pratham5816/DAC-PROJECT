package com.app.controller;

import com.app.dto.EmailRequest;
import com.app.model.Driver;
import com.app.service.DriverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("driver")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }


    @PostMapping("/addDriver")
    public ResponseEntity<Driver> addDriver(@RequestBody Driver driver) {
        driverService.registerDriver(driver);
        return ResponseEntity.ok().body(driver);
    }

    @PostMapping("/getDriverByEmail")
    public ResponseEntity<Driver> getDriverByEmail(@RequestBody EmailRequest emailRequest) {
       Driver temp = driverService.getDriver(emailRequest);
       return ResponseEntity.ok().body(temp);
    }
}
