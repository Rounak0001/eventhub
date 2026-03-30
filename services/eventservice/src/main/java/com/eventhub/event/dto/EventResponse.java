package com.EventZen.event.dto;

import com.EventZen.event.enums.EventStatus;
import com.EventZen.event.enums.TicketType;
import com.EventZen.event.enums.VisibilityType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
public class EventResponse {
    private Long id;
    private Long organizerId;
    private Long cityId;
    private Long eventTypeId;
    private Long venueId;
    private Long decorationVendorId;
    private Long foodVendorId;
    private String title;
    private String description;
    private LocalDate eventDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer seatCapacity;
    private Integer expectedGuests;
    private Integer bookedSeats;
    private VisibilityType visibility;
    private String accessCode;
    private TicketType ticketType;
    private BigDecimal ticketPrice;
    private BigDecimal venueCost;
    private BigDecimal decorationCost;
    private BigDecimal foodCost;
    private BigDecimal platformFee;
    private BigDecimal totalCost;
    private EventStatus status;
    private LocalDateTime registrationDeadline;
}