package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CheckpointUpdateCoordinatesRequest {
    private String checkpointName;
    private Double latitude;
    private Double longitude;
}
