package com.tour.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.tour.demo.dtobject.TourRequestDTO;
import com.tour.demo.dtobject.TourResponseDTO;
import com.tour.demo.model.Tour;
import com.tour.demo.model.User;
import com.tour.demo.repository.TourRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository tourRepository;

    public Tour createTour(TourRequestDTO tour,Authentication authentication){

        User user =(User) authentication.getPrincipal();

        Tour tour2=tourMapperRequest(tour);

        tour2.setUser(user);

        return tourRepository.save(tour2);
    }

    public List<Tour> getTours(User user){
        return tourRepository.findByUser(user);
    }

    public Tour getTour(Long id){
        return tourRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tour not found"));
    }

    public void deleteTour(Tour tour){
        tourRepository.delete(tour);
    }

    public Tour updateTour(Tour tour,Authentication authentication){
        Optional<Tour> tOpt=tourRepository.findById(tour.getId());

        if(tOpt.isEmpty()){
            return null;
        }

        User user =(User) authentication.getPrincipal();

        tour.setUser(user);

        Tour updated=tourRepository.save(tour);

        return updated;

    }

    public Tour tourMapperRequest(TourRequestDTO dto){
        Tour tour = Tour.builder()
        .name(dto.getName())
        .country(dto.getCountry())
        .startDate(dto.getStartDate())
        .endDate(dto.getEndDate())
        .hotelReminderDate(
            dto.getHotelReminderDate()
        )
        .activityReminderDate(
            dto.getActivityReminderDate()
        )
        .notes(dto.getNotes())
        .status(dto.getStatus())
        .hotelAnnounced(
            dto.getHotelAnnounced()
        )
        .activitiesAnnounced(
            dto.getActivitiesAnnounced()
        )
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
            .hotelReminderDate(tour.getHotelReminderDate())
            .activityReminderDate(tour.getActivityReminderDate())
            .hotelAnnounced(tour.getHotelAnnounced())
            .activitiesAnnounced(tour.getActivitiesAnnounced())
            .notes(tour.getNotes())
            .createdAt(tour.getCreatedAt())
            .updatedAt(tour.getUpdatedAt())
            .build();

        return tDto;
    }

}
