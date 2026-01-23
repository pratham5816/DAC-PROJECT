package com.app.controller;

import com.app.dto.VehicleRequest;
import com.app.model.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.service.VehicleService;

import java.util.List;

@RestController
@RequestMapping("Vehicle")
@CrossOrigin("http://localhost:5173")
public class VehicleController {
    
    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/getAll")
    public List<Vehicle> getAllVehicles(){
        return vehicleService.fetchAllVehicle();
    }


    @PostMapping("/addVehicle")
    public ResponseEntity<String> addVehicle(@RequestBody VehicleRequest vehicleRequest){
        Vehicle saved = vehicleService.addVehicle(vehicleRequest);
        // return only the vehicle identifier to avoid recursive toString/json issues
        return ResponseEntity.status(201).body("Vehicle added successfully: " + saved.getVechicleNumber());
    }
    
}

