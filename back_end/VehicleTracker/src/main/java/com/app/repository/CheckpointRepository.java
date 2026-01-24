package com.app.repository;

import com.app.model.Checkpoint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;


public interface CheckpointRepository extends JpaRepository<Checkpoint, Integer> {
    Optional<Checkpoint> findByName(String name);
}
