package com.tour.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tour.demo.model.User;

public interface UserRepository extends JpaRepository<User,Long>{

}
