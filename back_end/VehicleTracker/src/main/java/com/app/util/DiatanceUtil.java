package com.app.util;

public class DiatanceUtil {

    // After Researching we found that harversine formula is best to calculate distance between two geo coordinates
    // As We are calculating distance between two geo coordinates using this we are getting Arial distance.
    // Treating connection of two geo coordinates as straight line.
    // We are going to compare the checkpoint distance with the coordinates from navigator object of BOM in driver interface.


    private static final double EARTH_RADIUS_KM = 6371.0;

    public static double haversine(

            double lat1, double lon1,
            double lat2, double lon2) {

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1))
                * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }

}
