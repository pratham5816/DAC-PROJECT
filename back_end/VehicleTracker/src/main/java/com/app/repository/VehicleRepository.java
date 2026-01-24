package com.app.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.Vehicle;

import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle,Integer> {
    Optional<Vehicle> findByVechicleNumber(String vechicleNumber);
    boolean existsByVechicleNumber(String vechicleNumber);
}
