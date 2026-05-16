package com.tour.demo.dtobject;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TourResponseDTO {
    private Long id;

    private String name;

    private String country;

    private LocalDate startDate;

    private LocalDate endDate;

    private String status;

    private Boolean hotelAnnounced;

    private Boolean activitiesAnnounced;
}
