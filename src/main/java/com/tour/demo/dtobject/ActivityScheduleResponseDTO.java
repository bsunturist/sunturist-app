package com.tour.demo.dtobject;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ActivityScheduleResponseDTO {
    private Long id;

    private Integer dayOrder;

    private Long activityId;

    private String activityName;

    private Integer defaultDays;
}
