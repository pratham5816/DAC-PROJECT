package com.app.service;

import java.util.List;

import com.app.exception.UserNotFound;
import com.app.exception.VehicleAlreadyExists;
import com.app.model.User;
import com.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.model.Vehicle;
import com.app.repository.VehicleRepository;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public List<Vehicle> fetchAllVehicle(){
        return vehicleRepository.findAll();
    }


    @Transactional
    public Vehicle addVehicle(Vehicle vehicle){

        //if (vehicle == null) throw new IllegalArgumentException("Vehicle must not be null");

//        if (vehicle.getVechicleNumber() == null || vehicle.getVechicleNumber().isBlank())
//            throw new IllegalArgumentException("Vehicle number must be provided");

        if (vehicleRepository.existsByVechicleNumber(vehicle.getVechicleNumber()))
            throw new VehicleAlreadyExists("Vehicle with vehicle number "+ vehicle.getVechicleNumber() + " already exists");

        if (vehicle.getUser() == null) throw new IllegalArgumentException("Vehicle must be associated with a user id");

        Integer id = vehicle.getUser().getId();

        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFound(id));

        vehicle.setUser(user);

        return  vehicleRepository.save(vehicle);

    }

}
