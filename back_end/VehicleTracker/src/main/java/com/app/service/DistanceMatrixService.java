package com.app.service;

import com.app.dto.*;
import com.app.exception.CheckpointNotFound;
import com.app.exception.DistanceCalulationError;
import com.app.exception.DriveNotFound;
import com.app.model.Checkpoint;
import com.app.model.Drive;
import com.app.repository.CheckpointRepository;
import com.app.repository.DriveRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Optional;

@Service
public class DistanceMatrixService {

    private final DriveService driveService;
    private final CheckpointRepository checkpointRepository;
    private final DriveRepository driveRepository;
    private final RestClient restClient;
    private final String apiKey;

    public DistanceMatrixService(DriveRepository driveRepository , RestClient restClient , @Value("${matrix.service.key}") String apiKey , DriveService driveService , CheckpointRepository checkpointRepository) {
        this.checkpointRepository = checkpointRepository;
        this.driveService = driveService;
        this.apiKey = apiKey;
        this.driveRepository = driveRepository;
        this.restClient = restClient;
    }

    private Element getElement(double lat1, double long1 , double lat2, double long2) {
        MatrixLocationResponse result = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/maps/api/distancematrix/json")
                        .queryParam("origins", lat1 + "," + long1)
                        .queryParam("destinations", lat2 + "," + long2)
                        .queryParam("key", apiKey)
                        .build())
                .retrieve()
                .body(MatrixLocationResponse.class);

        if(result == null || result.getRows() == null || result.getRows().isEmpty()) throw new DistanceCalulationError("distance calutlation error");

        Row row = result.getRows().get(0);

        if(row == null || row.getElements() == null || row.getElements().isEmpty()) throw new DistanceCalulationError("distance calutlation error");

        Element element = row.getElements().get(0);

        if(!"OK".equals(element.getStatus())) throw new DistanceCalulationError("distance calutation error");

        return element;
    }

    public DistanceTimeResponse calculateDistanceMatrix(String vehicleNumber){
        // Logic to call external distance matrix API using restClient
        // and process the response to create MatrixLocationResponse
        vehicleNumber = vehicleNumber.trim().toLowerCase();

        Optional<Drive> drive = driveRepository.findByVehicle_VechicleNumber(vehicleNumber);

        if(drive.isEmpty()) throw new DriveNotFound(new ErrorResponse("Drive not found for vehicle number: " + vehicleNumber));

        // we need two distances here one from last updated to nearnest point and second from last updated to destination.

        if(drive.get().getLongitude() == 0 || drive.get().getLatitude() == 0) throw new DistanceCalulationError("distance calculation error"); // will change later

        LocationResponse res = driveService.getNearByCheckpointLocation(vehicleNumber);

        Optional<Checkpoint> nearestCheckpoint = checkpointRepository.findByName(res.getLocation());

        if(nearestCheckpoint.isEmpty() ) throw new CheckpointNotFound(new ErrorResponse("Checkpoint not found"));

        Element elementNearCheckpoint = getElement(drive.get().getLatitude() , drive.get().getLongitude(), nearestCheckpoint.get().getLatitude(), nearestCheckpoint.get().getLongitude());

        if(!("OK").equals(elementNearCheckpoint.getStatus())) throw new DistanceCalulationError("Distance Calculation Error");

        Checkpoint destinationCheckpoint = drive.get().getEnd_point();

        Element elementFromDestination = getElement(drive.get().getLatitude() , drive.get().getLongitude(), destinationCheckpoint.getLatitude(), destinationCheckpoint.getLongitude());

        if(!("OK").equals(elementFromDestination.getStatus())) throw new DistanceCalulationError("Distance Calculation Error");
        String gmapsUrl = "https://www.google.com/maps?q=" + drive.get().getLatitude() + "," + drive.get().getLongitude();


        return new DistanceTimeResponse(elementNearCheckpoint.getDistance().getText() , elementNearCheckpoint.getDuration().getText() , nearestCheckpoint.get().getName(), elementFromDestination.getDistance().getText() , elementFromDestination.getDuration().getText() , destinationCheckpoint.getName() , gmapsUrl);
    }
}
