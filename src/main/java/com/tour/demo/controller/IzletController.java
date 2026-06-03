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

import com.tour.demo.model.Izlet;
import com.tour.demo.service.IzletService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/izleti")
public class IzletController {

    private final IzletService izletService;

    @GetMapping
    public List<Izlet> getAll(){
        return izletService.findAll();
    }

    @GetMapping("/{id}")
    public Izlet getById(@PathVariable Long id){
        return izletService.findById(id);
    }

    @PostMapping
    public Izlet create(@RequestBody Izlet izlet){
        return izletService.create(izlet);
    }

    @PutMapping("/{id}")
    public Izlet update(@PathVariable Long id,@RequestBody Izlet izlet){
        return izletService.update(id, izlet);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        izletService.delete(id);
    }

}
