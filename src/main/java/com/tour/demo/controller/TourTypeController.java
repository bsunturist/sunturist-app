package com.tour.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tour.demo.model.TourType;
import com.tour.demo.repository.TourTypeRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tour-types")
public class TourTypeController {

    private final TourTypeRepository tourTypeRepository;

    @GetMapping
    public List<TourType> getTourTypes(){

        return tourTypeRepository.findAll();
    }

}
