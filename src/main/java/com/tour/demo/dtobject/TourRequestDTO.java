package com.tour.demo.dtobject;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TourRequestDTO {

    @NotBlank
    private String name;

    private String country;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;

    @NotNull
    private LocalDate hotelReminderDate;

    @NotNull
    private LocalDate activityReminderDate;

    private String notes;

    @NotNull
    private String status;

    @NotNull
    private Long userId;
}
