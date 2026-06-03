package com.tour.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tour.demo.model.Izlet;
import com.tour.demo.repository.IzletRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IzletService {

    private final IzletRepository izletRepository;

    public List<Izlet> findAll(){
        return izletRepository.findAll();
    }

    public Izlet findById(Long id){
        return izletRepository.findById(id).orElseThrow(()->new RuntimeException("Couldn't find izlet"));
    }

    public Izlet create(Izlet izlet){
        return izletRepository.save(izlet);
    }

    public Izlet update(Long id, Izlet updated) {

        Izlet izlet = findById(id);

        izlet.setName(updated.getName());
        izlet.setGuide(updated.getGuide());
        izlet.setSecondGuide(updated.getSecondGuide());
        izlet.setTimeOfIzlet(updated.getTimeOfIzlet());
        izlet.setNumParticipants(updated.getNumParticipants());
        izlet.setNumTransferParticipants(updated.getNumTransferParticipants());
        izlet.setNumVehicles(updated.getNumVehicles());
        izlet.setDrivers(updated.getDrivers());
        izlet.setNotes(updated.getNotes());

        return izletRepository.save(izlet);
    }

    public void delete(Long id){
        izletRepository.deleteById(id);
    }

}
