package com.app.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.Vehicle;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle,Integer> {
    List<Vehicle> findByVechicleNumber(String vechicleNumber);
    boolean existsByVechicleNumber(String vechicleNumber);
}
