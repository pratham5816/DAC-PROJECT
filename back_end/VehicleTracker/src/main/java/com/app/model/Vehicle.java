package com.app.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Vehicle {
    @Id
    @Column(length = 30)
    private String vechicleNumber;
    @Column(length = 30)
    private String vehicleType;
    private Integer challan_Exp;   // expenditure
    private Integer vehicle_Exp;


    @ManyToOne(optional = false)
    @JoinColumn(name = "user")
    private User user;
}
