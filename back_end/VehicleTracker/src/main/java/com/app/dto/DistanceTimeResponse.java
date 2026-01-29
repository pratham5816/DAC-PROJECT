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
    private String DistanceFromNearCP;
    private String TimeFromNearCP;
    private String NearestCp;
    private String DistanceFromFinalCP;
    private String TimeFromFinalCP;
    private String FinalCp;
}
