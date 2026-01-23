package com.app.controller;

import com.app.dto.RequestDrive;
import com.app.model.Drive;
import com.app.repository.DriveRepository;
import com.app.service.DriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("Drive")
public class DriveController {

    @Autowired
    private DriveService driveService;

    @PostMapping("/createDrive")
    public ResponseEntity<String> drive(@RequestBody RequestDrive requestDrive){
        driveService.startDrive(requestDrive);
        return ResponseEntity.ok("Drive created successfully");
    }

}
