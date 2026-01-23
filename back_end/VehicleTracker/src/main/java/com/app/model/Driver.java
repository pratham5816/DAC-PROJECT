package com.app.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int driverId;
    @Column(nullable = false)
    private String driverName;
    @Column(nullable = false)
    private String licenseNumber;
    @Column(nullable = false , unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
}
