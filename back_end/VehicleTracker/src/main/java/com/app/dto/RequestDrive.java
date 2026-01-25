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
    private Integer driverId;          // Driver.driverId

    private String vehicleNumber;     // Vehicle.vechicleNumber (String!)

    private Double latitude;            // optional initial location
    private Double longitude;

    private Integer startpointId;       // Checkpoint.id
    private Integer endpointId;         // Checkpoint.id
}
