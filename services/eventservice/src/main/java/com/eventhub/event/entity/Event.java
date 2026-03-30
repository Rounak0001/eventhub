package com.EventZen.event.entity;

import com.EventZen.event.enums.EventStatus;
import com.EventZen.event.enums.TicketType;
import com.EventZen.event.enums.VisibilityType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "events")
@Getter
@Setter
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "organizer_id", nullable = false)
    private Long organizerId;

    @Column(name = "city_id", nullable = false)
    private Long cityId;

    @Column(name = "event_type_id", nullable = false)
    private Long eventTypeId;

    @Column(name = "venue_id", nullable = false)
    private Long venueId;

    @Column(name = "decoration_vendor_id", nullable = false)
    private Long decorationVendorId;

    @Column(name = "food_vendor_id", nullable = false)
    private Long foodVendorId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "seat_capacity", nullable = false)
    private Integer seatCapacity;

    @Column(name = "expected_guests")
    private Integer expectedGuests;

    @Column(name = "booked_seats", nullable = false)
    private Integer bookedSeats;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VisibilityType visibility;

    @Column(name = "access_code")
    private String accessCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "ticket_type", nullable = false)
    private TicketType ticketType;

    @Column(name = "ticket_price")
    private BigDecimal ticketPrice;

    @Column(name = "venue_cost", nullable = false)
    private BigDecimal venueCost;

    @Column(name = "decoration_cost", nullable = false)
    private BigDecimal decorationCost;

    @Column(name = "food_cost", nullable = false)
    private BigDecimal foodCost;

    @Column(name = "platform_fee", nullable = false)
    private BigDecimal platformFee;

    @Column(name = "total_cost", nullable = false)
    private BigDecimal totalCost;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventStatus status;

    @Column(name = "registration_deadline", nullable = false)
    private LocalDateTime registrationDeadline;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;
}