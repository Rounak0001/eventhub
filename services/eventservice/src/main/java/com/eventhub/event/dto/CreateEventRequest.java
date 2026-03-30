package com.EventZen.event.dto;

import com.EventZen.event.enums.TicketType;
import com.EventZen.event.enums.VisibilityType;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class CreateEventRequest {

    @NotNull
    private Long organizerId;

    @NotNull
    private Long cityId;

    @NotNull
    private Long eventTypeId;

    @NotNull
    private Long venueId;

    @NotNull
    private Long decorationVendorId;

    @NotNull
    private Long foodVendorId;

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private LocalDate eventDate;

    @NotNull
    private LocalTime startTime;

    @NotNull
    private LocalTime endTime;

    @NotNull
    @Min(1)
    private Integer seatCapacity;

    private Integer expectedGuests;

    @NotNull
    private VisibilityType visibility;

    private String accessCode;

    @NotNull
    private TicketType ticketType;

    private BigDecimal ticketPrice;
}