package com.tour.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tour.demo.model.Activity;
import com.tour.demo.repository.ActivityRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityRepository activityRepository;

    @GetMapping
    public List<Activity> getAll(){
        return activityRepository.findAll();
    }

    @PostMapping
    public Activity create(@RequestBody Activity a){
        return activityRepository.save(a);
    }

    @PutMapping("/{id}")
    public Activity update(@PathVariable Long id,@RequestBody Activity updated){
        Activity a=activityRepository.findById(id).orElseThrow();

        a.setName(updated.getName());
        a.setLocation(updated.getLocation());
        a.setDefaultDays(updated.getDefaultDays());
        a.setNotes(updated.getNotes());

        return activityRepository.save(a);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        activityRepository.deleteById(id);
    }

}
