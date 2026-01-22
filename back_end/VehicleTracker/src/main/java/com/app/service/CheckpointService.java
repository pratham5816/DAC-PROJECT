package com.app.service;

import com.app.model.Checkpoint;
import com.app.repository.CheckpointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CheckpointService {

    @Autowired
    private CheckpointRepository checkpointRepository;

    public Checkpoint addCheckpoint(Checkpoint checkpoint) {
        List<Checkpoint> temp = checkpointRepository.findByName(checkpoint.getName());

//        if(temp.isEmpty()) throw new


        return checkpointRepository.save(checkpoint);
    }
}
