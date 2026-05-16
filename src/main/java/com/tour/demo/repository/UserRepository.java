package com.tour.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tour.demo.model.User;


public interface UserRepository extends JpaRepository<User,Long>{

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);



}
