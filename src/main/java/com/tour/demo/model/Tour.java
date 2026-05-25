package com.tour.demo.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tour.demo.enums.TourStatus;
import com.tour.demo.enums.TourTypeEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tours")
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank
    private String name;

    private String country;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;

    @Column(length = 2000)
    private String notes;

    @Enumerated(EnumType.STRING)
    private TourStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tour_type_id")
    @NotNull
    private TourType tourType;

    @Column(nullable = false)
    private Boolean hotelAnnounced;

    @Column(nullable = false)
    private Boolean activitiesAnnounced;

    @OneToMany(mappedBy = "tour",cascade = CascadeType.ALL,orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    @JsonManagedReference
    @Builder.Default
    private List<TourAccommodationSchedule> accommodationSchedule=new ArrayList<>();

    @OneToMany(mappedBy = "tour",cascade = CascadeType.ALL,orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    @JsonManagedReference
    @Builder.Default
    private List<TourActivitySchedule> activitySchedule=new ArrayList<>();

    @JsonProperty
    public LocalDate getConfirmationReminderDate(){

        return startDate.minusDays(45);
    }

    @JsonProperty
    public LocalDate getHotelReminderDate(){

        if(tourType.getCategory()==TourTypeEnum.SELFGUIDED){
            LocalDate reminder=startDate.minusDays(60);

            if(reminder.isBefore(LocalDate.now())){
                return LocalDate.now();
            }

            return reminder;
        }

        return startDate.minusDays(2);
    }

    @JsonProperty
    public LocalDate
    getActivityReminderDate() {

        if (
            tourType.getCategory()
            ==
            TourTypeEnum.SELFGUIDED
        ) {

            LocalDate reminder =
                startDate.minusDays(60);

            if (
                reminder.isBefore(
                    LocalDate.now()
                )
            ) {

                return LocalDate.now();
            }

            return reminder;
        }

        return startDate.minusDays(2);
    }
}
