package com.app.service;

import com.app.dto.CheckpointResponse;
import com.app.exception.CheckpointAlreadyExists;
import com.app.model.Checkpoint;
import com.app.repository.CheckpointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class CheckpointService {

    @Autowired
    private CheckpointRepository checkpointRepository;

    public Checkpoint addCheckpoint(Checkpoint checkpoint) {
        Optional<Checkpoint> temp = checkpointRepository.findByName(checkpoint.getName());

       if(temp.isPresent()) throw new CheckpointAlreadyExists(checkpoint.getName());
        checkpoint.setName(checkpoint.getName().toLowerCase());
        return checkpointRepository.save(checkpoint);
    }


    public List<CheckpointResponse> getAllCheckpoints() {
        return checkpointRepository.findAll().stream().map(cp -> new CheckpointResponse(cp.getId(), cp.getName())).toList();
    }
}
