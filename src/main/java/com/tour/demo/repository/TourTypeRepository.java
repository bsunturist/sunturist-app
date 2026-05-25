package com.tour.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tour.demo.model.TourType;

public interface TourTypeRepository extends JpaRepository<TourType,Long>{

}
