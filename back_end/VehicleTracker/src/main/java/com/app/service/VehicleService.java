package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.VehicleRequest;
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


    private final VehicleRepository vehicleRepository;

    private final UserRepository userRepository;

    private final UserService userService;

    public VehicleService(VehicleRepository vehicleRepository, UserRepository userRepository, UserService userService) {
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }
    public List<Vehicle> fetchAllVehicle(){
        return vehicleRepository.findAll();
    }


    @Transactional
    public Vehicle addVehicle(VehicleRequest vehicleRequest){
        Optional<User> user = userService.getUserById(vehicleRequest.getUserId());

        if(user.isEmpty()) throw new UserNotFound(vehicleRequest.getUserId());

        if (vehicleRepository.existsByVechicleNumber(vehicleRequest.getVehicleNumber()))
            throw new VehicleAlreadyExists("Vehicle with vehicle number "+ vehicleRequest.getVehicleNumber() + " already exists");


        Integer id = vehicleRequest.getUserId();
        Vehicle vehicle = new Vehicle();
        vehicle.setVechicleNumber(vehicleRequest.getVehicleNumber());
        vehicle.setVehicleType(vehicleRequest.getVehicleType());
        vehicle.setVehicle_Exp(vehicleRequest.getVehicle_Exp());
        vehicle.setChallan_Exp(vehicleRequest.getChallan_Exp());
        vehicle.setUser(user.get());

        return  vehicleRepository.save(vehicle);

    }

}
