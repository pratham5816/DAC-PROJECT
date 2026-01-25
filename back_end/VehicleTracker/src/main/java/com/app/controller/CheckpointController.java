package com.app.controller;

import com.app.dto.CheckpointResponse;
import com.app.dto.CheckpointUpdateCoordinatesRequest;
import com.app.model.Checkpoint;
import com.app.service.CheckpointService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("checkpoint")
@CrossOrigin("http://localhost:5173")

public class CheckpointController {

    private final CheckpointService checkpointService;

    public CheckpointController(CheckpointService checkpointService) {
        this.checkpointService = checkpointService;
    }
    @PostMapping("/addCheckpoint")
    public ResponseEntity<?> addCheckpoint(@RequestBody Checkpoint checkpoint) {


        if(checkpoint == null || checkpoint.getName() == null || checkpoint.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Checkpoint data is required");
        }

        checkpointService.addCheckpoint(checkpoint);

        return ResponseEntity.status(201).body("Checkpoint added successfully: " + checkpoint.getName());
    }

//    @PostMapping("/getCheckpoint")
//    public ResponseEntity<?> getCheckpoint(@RequestBody Checkpoint checkpoint) {
//
//    }


    @GetMapping("/getAllCheckpoints")
    public List<CheckpointResponse> getAllCheckpoints() {
        return checkpointService.getAllCheckpoints();
    }

    @PatchMapping("/updateCheckpoint")
    public ResponseEntity<?> updateCheckpoint(@RequestBody CheckpointUpdateCoordinatesRequest checkpointUpdateCoordinatesRequest) {
        checkpointUpdateCoordinatesRequest.setCheckpointName(checkpointUpdateCoordinatesRequest.getCheckpointName().toLowerCase());
        checkpointService.updateCoordinates(checkpointUpdateCoordinatesRequest);
        return ResponseEntity.ok().body(checkpointUpdateCoordinatesRequest);
    }

    @GetMapping("/getAll")
    public List<Checkpoint> getAll() {
        return checkpointService.getAllCheckpoint2();
    }
}
