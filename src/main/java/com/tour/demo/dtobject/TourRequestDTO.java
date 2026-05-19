package com.tour.demo.dtobject;

import java.time.LocalDate;

import com.tour.demo.enums.TourStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    private TourStatus status;

    private Boolean hotelAnnounced;

    private Boolean activitiesAnnounced;
}
