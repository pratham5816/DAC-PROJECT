package com.app.controller;

import com.app.model.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.service.VehicleService;

import java.util.List;

@RestController
@RequestMapping("Vehicle")
public class VehicleController {
    
    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/getAll")
    public List<Vehicle> getAllVehicles(){
        return vehicleService.fetchAllVehicle();
    }


    @PostMapping("/addVehicle")
    public ResponseEntity<String> addVehicle(@RequestBody Vehicle vehicle){
        Vehicle saved = vehicleService.addVehicle(vehicle);
        // return only the vehicle identifier to avoid recursive toString/json issues
        return ResponseEntity.status(201).body("Vehicle added successfully: " + saved.getVechicleNumber());
    }
    
}

