package com.tour.demo.dtobject;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsDTO {

    private Long totalTours;

    private Long plannedTours;

    private Long confirmedTours;

    private Long completedTours;

    private Long canceledTours;

    private Long urgentReminders;

}
