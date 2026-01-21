package com.app.controller;

import com.app.model.Checkpoint;
import com.app.service.CheckpointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("checkpoint")
public class CheckpointController {

    @Autowired
    private CheckpointService checkpointService;

    @PostMapping("/addCheckpoint")
    public ResponseEntity<?> addCheckpoint(@RequestBody Checkpoint checkpoint) {
       // checkpointService.addCheckpoint(Checkpoint);

        return ResponseEntity.status(201).body("Checkpoint added successfully: " + checkpoint.getName());
    }

    @PostMapping("/")
    public ResponseEntity<?> getCheckpoint(@RequestBody Checkpoint checkpoint) {

    }


}
