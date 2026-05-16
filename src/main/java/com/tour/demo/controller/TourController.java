package com.tour.demo.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tour.demo.model.Tour;
import com.tour.demo.model.User;
import com.tour.demo.service.TourService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tours")
public class TourController {

    private final TourService tourService;

    @PostMapping
    public Tour createTour(@Valid @RequestBody Tour tour,Authentication authentication){
        User user= (User) authentication.getPrincipal();

        tour.setUser(user);
        
        return tourService.createTour(tour);
    }

    @GetMapping
    public List<Tour> getTours(Authentication authentication){

        User user=(User) authentication.getPrincipal();

        return tourService.getTours(user);
    }

    @GetMapping("/{id}")
    public Tour getTour(@PathVariable Long id){
        return tourService.getTour(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTour(@PathVariable Long id){
        Tour tour=tourService.getTour(id);

        tourService.deleteTour(tour);
    }


    @PutMapping("/{id}")
    public Tour updateTour(@PathVariable Long id,@Valid @RequestBody Tour tour){
        tour.setId(id);

        return tourService.updateTour(tour);
    }

}
