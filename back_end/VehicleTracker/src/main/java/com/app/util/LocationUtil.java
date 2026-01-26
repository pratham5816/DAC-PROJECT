package com.app.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class LocationUtil {

    public static Double roundLatLong(Double value) {
        if (value == null) return null;

        return BigDecimal.valueOf(value)
                .setScale(7, RoundingMode.HALF_UP)
                .doubleValue();
    }
}