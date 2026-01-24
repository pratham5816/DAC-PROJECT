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

import java.util.Optional;

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

        if(driveRepository.existsByDriver_DriverId(requestDrive.getDriverId())) throw new DriverIsAlreadyActive("Driver is already active in another drive.");
        if(driveRepository.existsByVehicle_VechicleNumber(requestDrive.getVehicleNumber())) throw new DriveAlreadyExists("Vehicle is already active.");

        //Fetch Vehicle
        Optional<Vehicle> vehicle = vehicleRepository.findByVechicleNumber(requestDrive.getVehicleNumber());
        if(vehicle.isEmpty()) throw new VehicleNotFound("Vehicle not found");

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
        drive.setStatus("ACTIVE");
        drive.setDriver(driver);
        drive.setVehicle(vehicle.get());
        drive.setStart_point(startCheckpoint);
        drive.setEnd_point(endCheckpoint);
        drive.setLatitude(requestDrive.getLatitude());
        drive.setLongitude(requestDrive.getLongitude());

        driveRepository.save(drive);
    }


    public void upateLocationInDrive(com.app.dto.UpdateLocationRequest updateLocationRequest) {
        Drive drive = driveRepository.findByVehicle_VechicleNumber(updateLocationRequest.getVehicleNumber())
                .orElseThrow(() -> new DriveNotFound("Active drive not found for the given vehicle number"));

        drive.setLatitude(updateLocationRequest.getLatitude());
        drive.setLongitude(updateLocationRequest.getLongitude());

        driveRepository.save(drive);
    }
}
