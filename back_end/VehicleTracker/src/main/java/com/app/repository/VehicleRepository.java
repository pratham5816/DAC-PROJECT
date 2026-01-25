package com.app.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.Vehicle;

import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle,String> {
    Optional<Vehicle> findByVechicleNumber(String vehicleNumber);
    boolean existsByVechicleNumber(String vehicleNumber);
}
