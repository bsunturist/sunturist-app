package com.tour.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tour.demo.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity,Long>{

}
