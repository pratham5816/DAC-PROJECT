package com.app.controller;

import com.app.dto.CheckpointResponse;
import com.app.model.Checkpoint;
import com.app.service.CheckpointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("checkpoint")
@CrossOrigin("http://localhost:5173")

public class CheckpointController {

    @Autowired
    private CheckpointService checkpointService;

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

}
