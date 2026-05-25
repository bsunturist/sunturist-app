package com.tour.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.tour.demo.dtobject.AccommodationScheduleRequestDTO;
import com.tour.demo.dtobject.AccommodationScheduleResponseDTO;
import com.tour.demo.dtobject.ActivityScheduleRequestDTO;
import com.tour.demo.dtobject.ActivityScheduleResponseDTO;
import com.tour.demo.dtobject.DashboardStatsDTO;
import com.tour.demo.dtobject.TourRequestDTO;
import com.tour.demo.dtobject.TourResponseDTO;
import com.tour.demo.enums.TourStatus;
import com.tour.demo.model.Accommodation;
import com.tour.demo.model.Activity;
import com.tour.demo.model.Tour;
import com.tour.demo.model.TourAccommodationSchedule;
import com.tour.demo.model.TourActivitySchedule;
import com.tour.demo.model.TourType;
import com.tour.demo.model.User;
import com.tour.demo.repository.AccommodationRepository;
import com.tour.demo.repository.ActivityRepository;
import com.tour.demo.repository.TourAccommodationScheduleRepository;
import com.tour.demo.repository.TourActivityScheduleRepository;
import com.tour.demo.repository.TourRepository;
import com.tour.demo.repository.TourTypeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository tourRepository;
    private final TourTypeRepository tourTypeRepository;
    private final AccommodationRepository accommodationRepository;
    private final ActivityRepository activityRepository;
    private final TourAccommodationScheduleRepository accommodationScheduleRepository;
    private final TourActivityScheduleRepository activityScheduleRepository;
    private final HelperMethodService helperMethodService;

    public Tour createTour(TourRequestDTO dto,Authentication authentication){

        User user =(User) authentication.getPrincipal();

        Tour tour2=helperMethodService.tourMapperRequest(dto);

        tour2.setUser(user);

        Tour savedTour=tourRepository.save(tour2);


        if(dto.getAccommodationSchedules() != null){

            for(var item :
                dto.getAccommodationSchedules() 
            ){
                System.out.println(item);

                Accommodation accommodation =
                    accommodationRepository.findById(
                        item.getAccommodationId()
                    ).orElseThrow();

                TourAccommodationSchedule schedule =
                    new TourAccommodationSchedule();

                schedule.setTour(savedTour);

                schedule.setAccommodation(
                    accommodation
                );

                schedule.setOrderIndex(
                    item.getDayOrder()
                );

                accommodationScheduleRepository
                    .save(schedule);
            }
        }

        if(dto.getActivitySchedules() != null){

            for(var item :
                dto.getActivitySchedules()
            ){

                Activity activity =
                    activityRepository.findById(
                        item.getActivityId()
                    ).orElseThrow();

                TourActivitySchedule schedule =
                    new TourActivitySchedule();

                schedule.setTour(savedTour);

                schedule.setActivity(activity);

                schedule.setOrderIndex(
                    item.getDayOrder()
                );

                activityScheduleRepository
                    .save(schedule);
            }
        }

        Tour freshTour =
            tourRepository.findById(
                savedTour.getId()
            ).orElseThrow();

        return freshTour;
    }  

    public List<Tour> getTours(User user){
        
        return tourRepository.findByUser(user);
    }

    public Tour getTour(Long id){
        return tourRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tour not found"));
    }

    public void deleteTour(Long id){
        tourRepository.deleteById(id);
    }

    public TourResponseDTO updateTour(Long id,TourRequestDTO dto,Authentication authentication){

        Tour existing=tourRepository.findById(id).orElseThrow();

        User user=(User) authentication.getPrincipal();

        if(!existing.getUser().getId().equals(user.getId())){
            throw new RuntimeException("Forbidden");
        }

        existing.setName(dto.getName());

        existing.setCountry(dto.getCountry());

        existing.setStartDate(dto.getStartDate());

        existing.setEndDate(dto.getEndDate());

        existing.setStatus(dto.getStatus());

        existing.setNotes(dto.getNotes());

        existing.setHotelAnnounced(
            dto.getHotelAnnounced()
        );

        existing.setActivitiesAnnounced(
            dto.getActivitiesAnnounced()
        );

        TourType tourType =
            tourTypeRepository
                .findById(dto.getTourTypeId())
                .orElseThrow();

        existing.setTourType(tourType);

        existing.getAccommodationSchedule().clear();

        existing.getActivitySchedule().clear();

        for(
            AccommodationScheduleRequestDTO s
            : dto.getAccommodationSchedules()
        ){
            System.out.println();
            System.out.println(dto.getAccommodationSchedules());
            
            Accommodation accommodation =
                accommodationRepository
                    .findById(s.getAccommodationId())
                    .orElseThrow(()->new RuntimeException("No such accommodation"));

            TourAccommodationSchedule schedule =
                TourAccommodationSchedule.builder()
                    .tour(existing)
                    .accommodation(accommodation)
                    .orderIndex(s.getDayOrder())
                    .build();

            existing
                .getAccommodationSchedule()
                .add(schedule);
        }


        for(
            ActivityScheduleRequestDTO s
            : dto.getActivitySchedules()
        ){

            Activity activity =
                activityRepository
                    .findById(s.getActivityId())
                    .orElseThrow();

            TourActivitySchedule schedule =
                TourActivitySchedule.builder()
                    .tour(existing)
                    .activity(activity)
                    .orderIndex(s.getDayOrder())
                    .build();

            existing
                .getActivitySchedule()
                .add(schedule);
        }

        Tour saved=tourRepository.save(existing);

        return helperMethodService.tourMapperResponse(saved);

    }

    public DashboardStatsDTO getStats(User user){

        List<Tour> tours=getTours(user);

        long urgent=tours.stream().filter(t->{
            boolean confirmation=t.getConfirmationReminderDate().isBefore(LocalDate.now()
                .plusDays(1))&&t.getStatus().equals(TourStatus.PLANNED);
            
            boolean hotel =
            t.getHotelReminderDate()
            .isBefore(LocalDate.now().plusDays(1))
            &&
            !t.getHotelAnnounced();

            boolean activities =
                t.getActivityReminderDate()
                .isBefore(LocalDate.now().plusDays(1))
                &&
                !t.getActivitiesAnnounced();

            return confirmation || hotel || activities;
        }).count();

        return new DashboardStatsDTO(tourRepository.countByUser(user), 
            tourRepository.countByUserAndStatus(user, TourStatus.PLANNED), 
            tourRepository.countByUserAndStatus(user, TourStatus.CONFIRMED), 
            tourRepository.countByUserAndStatus(user,TourStatus.COMPLETED), 
            tourRepository.countByUserAndStatus(user,TourStatus.CANCELED), 
            urgent);
    }

}
