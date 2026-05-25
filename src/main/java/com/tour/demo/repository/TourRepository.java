package com.tour.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.tour.demo.enums.TourStatus;
import com.tour.demo.model.Tour;
import com.tour.demo.model.User;

public interface TourRepository extends JpaRepository<Tour,Long>, JpaSpecificationExecutor<Tour>{

    public List<Tour> findByUser(User user);

    long countByUser(User user);

    long countByUserAndStatus(User user, TourStatus status);

    Page<Tour> findAll(Specification<Tour> spec,Pageable pageable);

    


}
