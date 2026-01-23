package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VehicleRequest {
    private String vehicleNumber;
    private String vehicleType;
    private Integer challan_Exp;
    private Integer vehicle_Exp;
    private Integer userId;
}
