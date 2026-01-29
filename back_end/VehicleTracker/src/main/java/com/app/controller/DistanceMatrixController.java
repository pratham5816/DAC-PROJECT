package com.app.controller;


import com.app.dto.DistanceTimeResponse;
import com.app.service.DistanceMatrixService;
import com.app.service.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("matrix")
public class DistanceMatrixController {


    private final DistanceMatrixService distanceMatrixService;
    private final VehicleService vehicleService;

    public DistanceMatrixController(DistanceMatrixService distanceMatrixService, VehicleService vehicleService) {
        this.distanceMatrixService = distanceMatrixService;
        this.vehicleService = vehicleService;
    }

    @GetMapping("/details/{vehicleNumber}")
    public ResponseEntity<?> getDistanceMatrix(@PathVariable String vehicleNumber){

        DistanceTimeResponse res = distanceMatrixService.calculateDistanceMatrix(vehicleNumber);

        return ResponseEntity.ok().body(res);
    }
}
