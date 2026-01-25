package com.app.service;

import com.app.dto.CheckpointResponse;
import com.app.dto.CheckpointUpdateCoordinatesRequest;
import com.app.exception.CheckpointAlreadyExists;
import com.app.exception.CheckpointNotFound;
import com.app.model.Checkpoint;
import com.app.repository.CheckpointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class CheckpointService {


    private final CheckpointRepository checkpointRepository;

    public CheckpointService(CheckpointRepository checkpointRepository) {
        this.checkpointRepository = checkpointRepository;
    }

    public Checkpoint addCheckpoint(Checkpoint checkpoint) {
        Optional<Checkpoint> temp = checkpointRepository.findByName(checkpoint.getName());

       if(temp.isPresent()) throw new CheckpointAlreadyExists(checkpoint.getName());
        checkpoint.setName(checkpoint.getName().toLowerCase());
        return checkpointRepository.save(checkpoint);
    }

    public List<Checkpoint> getAllCheckpoint2() {
        return checkpointRepository.findAll();
    }
    public List<CheckpointResponse> getAllCheckpoints() {
        return checkpointRepository.findAll().stream().map(cp -> new CheckpointResponse(cp.getId(), cp.getName())).toList();
    }

    public Checkpoint updateCoordinates(CheckpointUpdateCoordinatesRequest request){
        Checkpoint existingCheckpoint = checkpointRepository.findByName(request.getCheckpointName()).orElseThrow(() -> new CheckpointNotFound("Checkpoint not found with name: " + request.getCheckpointName()));

        existingCheckpoint.setLatitude(request.getLatitude());
        existingCheckpoint.setLongitude(request.getLongitude());

        return checkpointRepository.save(existingCheckpoint);
    }
}
