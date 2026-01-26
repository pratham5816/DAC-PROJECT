package com.app.controller;


import com.app.dto.EmailRequest;
import com.app.dto.LocationResponse;
import com.app.dto.RequestDrive;
import com.app.dto.UpdateLocationRequest;
import com.app.model.Drive;
import com.app.service.DriveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("drive")
public class DriveController {


    private final DriveService driveService;

    public DriveController(DriveService driveService) {
        this.driveService = driveService;
    }

    @PostMapping("/createDrive")
    public Drive drive(@RequestBody RequestDrive requestDrive){
        return driveService.startDrive(requestDrive);
    }

    @PostMapping("/updateLocation")
    public ResponseEntity<?> updateLocation(@RequestBody UpdateLocationRequest updateLocationRequest){
            driveService.upateLocationInDrive(updateLocationRequest);
        return  ResponseEntity.ok("Location updated successfully");
    }

    @GetMapping("/getCurrentCheckpointLocation")    // url?vehicleNumber=KA01AB1234
    public ResponseEntity<?> getCurrentCheckpointLocation(@RequestParam("vehicleNumber") String vehicleNumber){
        LocationResponse res = driveService.getNearByCheckpointLocation(vehicleNumber);
        return ResponseEntity.ok().body(res);
    }


    @PostMapping("/checkDriverAssigned")
    public ResponseEntity<?> getDriverAssigned(@RequestBody EmailRequest emailRequest){

        Drive temp = driveService.checkDriverDrive(emailRequest);

        return ResponseEntity.ok().body(temp);
    }


}
