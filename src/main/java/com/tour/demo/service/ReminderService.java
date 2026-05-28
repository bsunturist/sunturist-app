package com.tour.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.tour.demo.enums.TourStatus;
import com.tour.demo.model.Tour;
import com.tour.demo.repository.TourRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReminderService {

    private final TourRepository tourRepository;

    private final EmailService emailService;

    @Scheduled(cron = "0 0 8 * * *",zone = "Europe/Zagreb")
    @Scheduled(fixedRate=60000)
    public void checkReminders(){
        List<Tour> tours=tourRepository.findAll();

        LocalDate today=LocalDate.now();

        for(Tour tour:tours){
            boolean needsHotel=!tour.getHotelAnnounced() && !tour.getHotelReminderDate().isAfter(today);

            System.out.println();
            System.out.println(tour.getName());

            boolean needsActivities= !tour.getActivitiesAnnounced() && !tour.getActivityReminderDate().isAfter(today);

            boolean needsConfirmation= tour.getStatus().equals(TourStatus.PLANNED) && !tour.getConfirmationReminderDate().isAfter(today);

            System.out.println();
            System.out.println(needsConfirmation);

            if(tour.getStatus().equals(TourStatus.CANCELED)){
                continue;
            }

            if(needsHotel||needsActivities||needsConfirmation){
                sendReminder(tour);
            }
        }
    }

    private void sendReminder(Tour tour){
        String subject="Tour Reminder";

        String text="Customer: "+tour.getName()
            +"\nTour Type: "+tour.getTourType().getName()
            +"\nStart Date: "+tour.getStartDate();

        emailService.sendMail(tour.getUser().getEmail(), subject, text);

    }

}
