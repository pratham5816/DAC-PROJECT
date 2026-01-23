package com.app.service;

import com.app.dto.RequestDrive;
import com.app.exception.*;
import com.app.model.Checkpoint;
import com.app.model.Drive;
import com.app.model.Driver;
import com.app.model.Vehicle;
import com.app.repository.CheckpointRepository;
import com.app.repository.DriveRepository;
import com.app.repository.DriverRepository;
import com.app.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriveService {

    @Autowired
    private DriveRepository driveRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private CheckpointRepository checkpointRepository;

    public void startDrive(RequestDrive requestDrive) {

        if(driveRepository.existsByDriver_Id(requestDrive.getDriverId())) throw new DriverIsAlreadyActive("Driver is already active in another drive.");
        if(driveRepository.existsByVehicle_Id(requestDrive.getVehicleId())) throw new DriveAlreadyExists("Vehicle is already active.");
        //
        //Fetch Vehicle
        Vehicle vehicle = vehicleRepository.findById(requestDrive.getVehicleId())
                .orElseThrow(() -> new VehicleNotFound("Vehicle not found"));

        //Fetch Driver
        Driver driver = driverRepository.findById(requestDrive.getDriverId())
                .orElseThrow(() -> new DriverNotFound("Driver not found"));

        //Fetch Start Checkpoint
        Checkpoint startCheckpoint = checkpointRepository
                .findById(requestDrive.getStartpointId())
                .orElseThrow(() -> new CheckpointNotFound("Start checkpoint not found"));

        //Fetch End Checkpoint
        Checkpoint endCheckpoint = checkpointRepository
                .findById(requestDrive.getEndpointId())
                .orElseThrow(() -> new RuntimeException("End checkpoint not found"));

        Drive drive = new Drive();

    }
}
