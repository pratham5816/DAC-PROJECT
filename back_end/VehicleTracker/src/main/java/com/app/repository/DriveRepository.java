package com.app.repository;

import com.app.model.Drive;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriveRepository extends JpaRepository<Drive,Integer> {
}
