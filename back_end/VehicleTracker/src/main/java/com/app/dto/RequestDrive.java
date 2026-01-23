package com.app.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestDrive {
    private Integer driveId;
    private Integer driverId;
    private Integer vehicleId;
    private String status;
    private Double latitude;
    private Double longitude;
    private Integer startpointId;
    private  Integer endpointId;
}
