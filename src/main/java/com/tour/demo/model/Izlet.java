package com.tour.demo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "izleti")
public class Izlet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String guide;

    private String secondGuide;

    private LocalDateTime timeOfIzlet;

    private Integer numParticipants;

    private Integer numTransferParticipants;

    private Integer numVehicles;

    @Column(length = 1000)
    private String drivers;

    @Column(length = 2000)
    private String notes;


}
