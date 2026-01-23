package com.app.repository;

import com.app.model.Drive;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DriveRepository extends JpaRepository<Drive,Integer> {

    Optional<Drive> findByVehicle_Id(Integer vehicleId);   // if drive exists for a vehicle
    Optional<Drive> findByDriver_Id(Integer driverId);  // if drive exists for a driver

    boolean existsByVehicle_Id(Integer vehicleId);
    boolean existsByDriver_Id(Integer driverId);

}
