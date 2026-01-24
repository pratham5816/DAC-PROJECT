package com.app.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateLocationRequest {
    // A request DTO to update the location of an ongoing drive(Existing in drive table).
    private String vehicleNumber;      // Drive.driveId
    private Double latitude;
    private Double longitude;
}
