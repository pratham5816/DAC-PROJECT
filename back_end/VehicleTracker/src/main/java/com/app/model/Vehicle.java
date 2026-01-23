package com.app.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Vehicle {
    @Id
    @Column(length = 30)
    private String vechicleNumber;
    @Column(length = 30 , nullable = false)
    private String vehicleType;
    @Column(columnDefinition = "int default 0")
    private Integer challan_Exp;   // expenditure
    @Column(columnDefinition = "int default 0")
    private Integer vehicle_Exp;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user")
    private User user;
}
