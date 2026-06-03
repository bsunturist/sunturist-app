package com.tour.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tour.demo.model.Izlet;

@Repository
public interface IzletRepository extends JpaRepository<Izlet,Long>{

}
