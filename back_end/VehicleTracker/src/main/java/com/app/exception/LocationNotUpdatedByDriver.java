package com.app.exception;

import com.app.dto.VehicleNumberRequest;

public class LocationNotUpdatedByDriver extends RuntimeException {
    public LocationNotUpdatedByDriver(String message) {
        super(message);
    }

    public LocationNotUpdatedByDriver(VehicleNumberRequest vehicleNumberRequest) {
        super("Location not updated by driver for vehicle number: " + vehicleNumberRequest.getVehicleNumber());
    }
}
