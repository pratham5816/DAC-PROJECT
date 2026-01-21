package com.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Checkpoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true, nullable = false)
    private String name;
    @Column(nullable = false)  // location of perticular checkpoints
    private double latitude;
    @Column(nullable = false)
    private double longitude;
    @Column(nullable = false)
    private double radiusKm; // radius in kilometers. A Vehicle is considered "at" the final checkpoint if within this radius.
}
