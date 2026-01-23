package com.app.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Drive {
    // most important model as this will keep track of running status of vehicle
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer driveId;
    // one vehicle can have many drives over time
    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;
    // one driver can have many drives over time
    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driver;

    @Column(length = 20, nullable = false)
    private String status;
    // CREATED, ACTIVE, COMPLETED, CANCELLED

    @Column(name = "recent_longitude", nullable = false)
    private Double longitude;

    @Column(name = "recent_latitude", nullable = false)
    private Double latitude;

    @ManyToOne
    @JoinColumn(name = "started_point")
    private Checkpoint start_point;

    @ManyToOne
    @JoinColumn(name = "ended_point")
    private Checkpoint end_point;
}
