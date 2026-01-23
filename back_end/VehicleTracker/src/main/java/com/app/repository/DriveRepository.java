package com.app.repository;

import com.app.model.Drive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriveRepository extends JpaRepository<Drive,Integer> {


    // Vehicle-based checks
    Optional<Drive> findByVehicle_VechicleNumber(String vechicleNumber);
    boolean existsByVehicle_VechicleNumber(String vechicleNumber);

    // Driver-based checks
    Optional<Drive> findByDriver_DriverId(Integer driverId);
    boolean existsByDriver_DriverId(Integer driverId);
}
