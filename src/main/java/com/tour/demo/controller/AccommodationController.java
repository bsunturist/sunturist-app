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

import com.tour.demo.model.Accommodation;
import com.tour.demo.repository.AccommodationRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/accommodations")
@RequiredArgsConstructor
public class AccommodationController {

    private final AccommodationRepository accommodationRepository;

    @GetMapping
    public List<Accommodation> getAll(){
        return accommodationRepository.findAll();
    }

    @PostMapping
    public Accommodation create(@RequestBody Accommodation a){
        return accommodationRepository.save(a);
    }

    @PutMapping("/{id}")
    public Accommodation update(@PathVariable Long id,@RequestBody Accommodation updated){
        Accommodation a=accommodationRepository.findById(id).orElseThrow();

        a.setName(updated.getName());
        a.setCity(updated.getCity());
        a.setCountry(updated.getCountry());
        a.setDefaultDays(updated.getDefaultDays());
        a.setNotes(updated.getNotes());
        a.setCapacity(updated.getCapacity());

        return accommodationRepository.save(a);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        accommodationRepository.deleteById(id);
    }

}
