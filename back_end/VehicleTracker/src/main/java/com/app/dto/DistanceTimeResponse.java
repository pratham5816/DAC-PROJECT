package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
@AllArgsConstructor
public class DistanceTimeResponse {
    private String distanceFromNearCP;
    private String timeFromNearCP;
    private String nearestCp;
    private String distanceFromFinalCP;
    private String timeFromFinalCP;
    private String finalCp;
    private String recentUpdatedMapUrl;
}
