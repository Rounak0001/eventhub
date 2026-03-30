package com.EventZen.registration.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "events")
@Getter
@Setter
public class Event {

    @Id
    private Long id;

    @Column(name = "seat_capacity")
    private Integer seatCapacity;

    @Column(name = "booked_seats")
    private Integer bookedSeats;

    private String visibility; // PUBLIC / PRIVATE

    @Column(name = "access_code")
    private String accessCode;

    private String status; // CONFIRMED

    @Column(name = "event_date")
    private LocalDate eventDate;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "registration_deadline")
    private java.time.LocalDateTime registrationDeadline;
}