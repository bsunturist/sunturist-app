package com.tour.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tour.demo.model.Tour;
import com.tour.demo.model.User;

import java.util.List;


public interface TourRepository extends JpaRepository<Tour,Long>{

    public List<Tour> findByUser(User user);

}
