package com.tour.demo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tour.demo.dtobject.DashboardStatsDTO;
import com.tour.demo.dtobject.TourRequestDTO;
import com.tour.demo.dtobject.TourResponseDTO;
import com.tour.demo.enums.TourStatus;
import com.tour.demo.model.Tour;
import com.tour.demo.model.User;
import com.tour.demo.service.HelperMethodService;
import com.tour.demo.service.TourService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tours")
public class TourController {

    private final TourService tourService;
    private final HelperMethodService helperMethodService;

    @PostMapping
    public TourResponseDTO createTour(@Valid @RequestBody TourRequestDTO tour,Authentication authentication){

        Tour tour2=tourService.createTour(tour, authentication);

        return helperMethodService.tourMapperResponse(tour2);
    }

    @GetMapping
    public List<TourResponseDTO> getTours(Authentication authentication){

        User user=(User) authentication.getPrincipal();

        return tourService.getTours(user).stream().map(helperMethodService::tourMapperResponse).toList();
    }

    @GetMapping("/{id}")
    public TourResponseDTO getTour(@PathVariable Long id){
        Tour tour=tourService.getTour(id);
        return helperMethodService.tourMapperResponse(tour);
    }

    @DeleteMapping("/{id}")
    public void deleteTour(@PathVariable Long id){

        tourService.deleteTour(id);
    }


    @PutMapping("/{id}")
    public TourResponseDTO updateTour(@PathVariable Long id,@Valid @RequestBody TourRequestDTO tour,Authentication authentication){

        return tourService.updateTour(id,tour,authentication);
    }

    @GetMapping("/stats")
    public DashboardStatsDTO getStats(Authentication authentication){
        User user=(User) authentication.getPrincipal();

        return tourService.getStats(user);
    }

}
