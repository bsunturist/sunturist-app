package com.tour.demo.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.tour.demo.dtobject.AccommodationScheduleResponseDTO;
import com.tour.demo.dtobject.ActivityScheduleResponseDTO;
import com.tour.demo.dtobject.TourRequestDTO;
import com.tour.demo.dtobject.TourResponseDTO;
import com.tour.demo.model.Tour;
import com.tour.demo.model.TourType;
import com.tour.demo.repository.TourTypeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HelperMethodService {

    private final TourTypeRepository tourTypeRepository;

    public Tour tourMapperRequest(TourRequestDTO dto){

        Optional<TourType> tType=tourTypeRepository.findById(dto.getTourTypeId());

        
        Tour tour = Tour.builder()
        .name(dto.getName())
        .country(dto.getCountry())
        .startDate(dto.getStartDate())
        .endDate(dto.getEndDate())
        .notes(dto.getNotes())
        .status(dto.getStatus())
        .hotelAnnounced(
            dto.getHotelAnnounced()
        )
        .activitiesAnnounced(
            dto.getActivitiesAnnounced()
        )
        .tourType(tType.get())
        .build();

        return tour;
    }

    public TourResponseDTO tourMapperResponse(Tour tour){

        TourResponseDTO tDto=TourResponseDTO.builder()
            .id(tour.getId())
            .name(tour.getName())
            .country(tour.getCountry())
            .startDate(tour.getStartDate())
            .endDate(tour.getEndDate())
            .status(tour.getStatus())
            .hotelAnnounced(tour.getHotelAnnounced())
            .activitiesAnnounced(tour.getActivitiesAnnounced())
            .notes(tour.getNotes())
            .createdAt(tour.getCreatedAt())
            .updatedAt(tour.getUpdatedAt())
            .tourTypeId(tour.getTourType().getId())
            .tourTypeName(tour.getTourType().getName())
            .tourTypeCategory(tour.getTourType().getCategory())
            .confirmationReminderDate(tour.getConfirmationReminderDate())
            .activityReminderDate(tour.getActivityReminderDate())
            .hotelReminderDate(tour.getHotelReminderDate())
            .accommodationSchedules(
                tour.getAccommodationSchedule().stream().map(schedule->AccommodationScheduleResponseDTO.builder().
                id(schedule.getId()).dayOrder(schedule.getOrderIndex()).accommodationId(schedule.getAccommodation().getId())
                .accommodationName(schedule.getAccommodation().getName()).defaultDays(schedule.getAccommodation().getDefaultDays()).build()).toList()                   
            )
            .activitySchedules(
                tour.getActivitySchedule()
                    .stream()
                    .map(schedule ->

                        ActivityScheduleResponseDTO
                            .builder()
                            .id(schedule.getId())
                            .dayOrder(
                                schedule.getOrderIndex()
                            )
                            .activityId(
                                schedule
                                    .getActivity()
                                    .getId()
                            )
                            .activityName(
                                schedule
                                    .getActivity()
                                    .getName()
                            )
                            .defaultDays(
                                schedule
                                    .getActivity()
                                    .getDefaultDays()
                            )
                            .build()
                    )
                    .toList()
            )
            .build();

        return tDto;
    }

}
