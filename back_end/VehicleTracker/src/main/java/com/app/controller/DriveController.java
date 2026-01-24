package com.app.controller;

import com.app.dto.LocationNameRequest;
import com.app.dto.RequestDrive;
import com.app.dto.UpdateLocationRequest;
import com.app.dto.VehicleNumberRequest;
import com.app.model.Drive;
import com.app.service.DriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("drive")
public class DriveController {

    @Autowired
    private DriveService driveService;

    @PostMapping("/createDrive")
    public Drive drive(@RequestBody RequestDrive requestDrive){
        return driveService.startDrive(requestDrive);
    }

    @PostMapping("/updateLocation")
    public ResponseEntity<?> updateLocation(@RequestBody UpdateLocationRequest updateLocationRequest){
            driveService.upateLocationInDrive(updateLocationRequest);
        return  ResponseEntity.ok("Location updated successfully");
    }

    @GetMapping("/getCurrentCheckpointLocation")
    public ResponseEntity<?> getCurrentCheckpointLocation(@RequestBody VehicleNumberRequest vehicleNumberRequest){
        LocationNameRequest locationNameRequest = driveService.getNearByCheckpointLocation(vehicleNumberRequest);
        return ResponseEntity.ok(locationNameRequest);
    }

}
