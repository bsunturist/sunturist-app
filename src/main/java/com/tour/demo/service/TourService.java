package com.tour.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.tour.demo.model.Tour;
import com.tour.demo.model.User;
import com.tour.demo.repository.TourRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository tourRepository;

    public Tour createTour(Tour tour){
        return tourRepository.save(tour);
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

    public Tour updateTour(Tour tour){
        Optional<Tour> tOpt=tourRepository.findById(tour.getId());

        if(tOpt.isEmpty()){
            return null;
        }

        Tour updated=tourRepository.save(tour);

        return updated;

    }

}
