package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

// plain pojo class for location name request
// we are using this as a request dto for runtime location name fetching
public class LocationNameRequest {
    private String locationName;
}
