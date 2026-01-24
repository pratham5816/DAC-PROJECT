package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
// using this in getting the current checkpoint location api  DriveController.java
public class VehicleNumberRequest {
    private String vehicleNumber;
}
