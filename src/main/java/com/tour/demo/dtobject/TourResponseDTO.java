package com.tour.demo.dtobject;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.tour.demo.enums.TourStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourResponseDTO {
    private Long id;

    private String name;

    private String country;

    private LocalDate startDate;

    private LocalDate endDate;

    private TourStatus status;

    private LocalDate hotelReminderDate;

    private LocalDate activityReminderDate;

    private Boolean hotelAnnounced;

    private Boolean activitiesAnnounced;

    private String notes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
