package com.tour.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tour.demo.model.Accommodation;

public interface AccommodationRepository extends JpaRepository<Accommodation,Long>{

}
