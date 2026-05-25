package com.tour.demo.dtobject;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccommodationScheduleResponseDTO {
    private Long id;

    private Integer dayOrder;

    private Long accommodationId;

    private String accommodationName;

    private Integer defaultDays;
}
