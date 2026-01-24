package com.app.service;

import com.app.dto.LocationNameRequest;
import com.app.dto.RequestDrive;
import com.app.dto.UpdateLocationRequest;
import com.app.dto.VehicleNumberRequest;
import com.app.exception.*;
import com.app.util.DiatanceUtil;
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


import java.util.List;
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

    public Drive startDrive(RequestDrive requestDrive) {

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
                .orElseThrow(() -> new CheckpointNotFound("End checkpoint not found"));

        Drive drive = new Drive();
        drive.setStatus("ACTIVE");
        drive.setDriver(driver);
        drive.setVehicle(vehicle.get());
        drive.setStart_point(startCheckpoint);
        drive.setEnd_point(endCheckpoint);
        drive.setLatitude(requestDrive.getLatitude());
        drive.setLongitude(requestDrive.getLongitude());

        return driveRepository.save(drive);
    }


    public void upateLocationInDrive(UpdateLocationRequest updateLocationRequest) {

        Drive drive = driveRepository.findByVehicle_VechicleNumber(updateLocationRequest.getVehicleNumber())
                .orElseThrow(() -> new DriveNotFound("Active drive not found for the given vehicle number"));

        try {
            drive.setLatitude(updateLocationRequest.getLatitude());
            drive.setLongitude(updateLocationRequest.getLongitude());
        }
        catch (Exception e) {
            throw new UnexpectedException(e.getMessage());
        }

        driveRepository.save(drive);
    }


//    public LocationNameRequest getNearByCheckpointLocation(VehicleNumberRequest vehicleNumberRequest) {
//
//        Drive drive = driveRepository.findByVehicle_VechicleNumber(vehicleNumberRequest.getVehicleNumber())
//                .orElseThrow(() -> new DriveNotFound("Active drive not found for the given vehicle number"));
//
//        // we need to iterate over all checkpoints to find the nearest one to the current location of the drive.
//        // using the util class to calculate distance between two lat long points in one point
//
//        List<Checkpoint> checkpoints = checkpointRepository.findAll();
//
//        if(checkpoints.isEmpty()) throw new CheckpointNotFound("Checkpoints not found");
//
//        // now we need to get the latest updated coordinates by driver from drive to compare with our checkpoints coordinates in database
//
//        // default coordinate 0 check.
//
//        if(drive.getLatitude() == 0.0 || drive.getLongitude() == 0.0) throw new LocationNotUpdatedByDriver(vehicleNumberRequest);
//
//        for(Checkpoint checkpoint : checkpoints) {
//
//        }
//        return locationNameRequest;
//    }
}
