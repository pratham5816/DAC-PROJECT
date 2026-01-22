package com.app.controller;

import com.app.model.Checkpoint;
import com.app.service.CheckpointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("checkpoint")
@CrossOrigin("http://localhost:5173")

public class CheckpointController {

    @Autowired
    private CheckpointService checkpointService;

    @PostMapping("/addCheckpoint")
    public ResponseEntity<?> addCheckpoint(@RequestBody Checkpoint checkpoint) {

        checkpointService.addCheckpoint(checkpoint);

        return ResponseEntity.status(201).body("Checkpoint added successfully: " + checkpoint.getName());
    }

//    @PostMapping("/getCheckpoint")
//    public ResponseEntity<?> getCheckpoint(@RequestBody Checkpoint checkpoint) {
//
//    }


}
