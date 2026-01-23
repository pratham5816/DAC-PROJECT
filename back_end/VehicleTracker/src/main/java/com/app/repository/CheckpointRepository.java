package com.app.repository;

import com.app.model.Checkpoint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface CheckpointRepository extends JpaRepository<Checkpoint, Integer> {
    List<Checkpoint> findByName(String name);
}
