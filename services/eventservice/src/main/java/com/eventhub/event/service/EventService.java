package com.eventhub.event.service;

import com.eventhub.event.dto.CancelEventRequest;
import com.eventhub.event.dto.CreateEventRequest;
import com.eventhub.event.dto.EventResponse;
import com.eventhub.event.dto.RescheduleEventRequest;
import com.eventhub.event.entity.*;
import com.eventhub.event.enums.EventStatus;
import com.eventhub.event.enums.TicketType;
import com.eventhub.event.enums.VisibilityType;
import com.eventhub.event.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final CityRepository cityRepository;
    private final EventTypeRepository eventTypeRepository;
    private final VenueRepository venueRepository;
    private final DecorationVendorRepository decorationVendorRepository;
    private final FoodVendorRepository foodVendorRepository;
    private final EventRepository eventRepository;

    private static final BigDecimal PLATFORM_FEE = BigDecimal.valueOf(2000);

    @Transactional
    public EventResponse createEvent(CreateEventRequest request) {
        validateBaseRequest(request);

        City city = cityRepository.findById(request.getCityId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid cityId"));

        EventType eventType = eventTypeRepository.findById(request.getEventTypeId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid eventTypeId"));

        Venue venue = venueRepository.findById(request.getVenueId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid venueId"));

        DecorationVendor decorationVendor = decorationVendorRepository.findById(request.getDecorationVendorId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid decorationVendorId"));

        FoodVendor foodVendor = foodVendorRepository.findById(request.getFoodVendorId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid foodVendorId"));

        validateCompatibility(request, venue, decorationVendor, foodVendor);

        if (request.getSeatCapacity() > venue.getSeatCapacityMax()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Seat capacity exceeds venue maximum capacity");
        }

        int foodGuestCount;
        if (request.getVisibility() == VisibilityType.PRIVATE) {
            if (request.getExpectedGuests() == null || request.getExpectedGuests() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expected guests are required for private events");
            }
            if (request.getExpectedGuests() > request.getSeatCapacity()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expected guests cannot exceed seat capacity");
            }
            if (request.getAccessCode() == null || request.getAccessCode().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Access code is required for private events");
            }
            foodGuestCount = request.getExpectedGuests();
        } else {
            foodGuestCount = request.getSeatCapacity();
        }

        if (request.getTicketType() == TicketType.PAID) {
            if (request.getTicketPrice() == null || request.getTicketPrice().compareTo(BigDecimal.ZERO) <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ticket price must be greater than 0 for paid events");
            }
        } else {
            request.setTicketPrice(BigDecimal.ZERO);
        }

        BigDecimal venueCost = venue.getBasePrice();
        BigDecimal decorationCost = decorationVendor.getPrice();
        BigDecimal foodCost = foodVendor.getPricePerPlate().multiply(BigDecimal.valueOf(foodGuestCount));
        BigDecimal totalCost = venueCost.add(decorationCost).add(foodCost).add(PLATFORM_FEE);

        LocalDateTime eventStartDateTime = LocalDateTime.of(request.getEventDate(), request.getStartTime());
        LocalDateTime registrationDeadline = eventStartDateTime.minusHours(24);

        Event event = new Event();
        event.setOrganizerId(request.getOrganizerId());
        event.setCityId(city.getId());
        event.setEventTypeId(eventType.getId());
        event.setVenueId(venue.getId());
        event.setDecorationVendorId(decorationVendor.getId());
        event.setFoodVendorId(foodVendor.getId());
        event.setTitle(request.getTitle().trim());
        event.setDescription(request.getDescription());
        event.setEventDate(request.getEventDate());
        event.setStartTime(request.getStartTime());
        event.setEndTime(request.getEndTime());
        event.setSeatCapacity(request.getSeatCapacity());
        event.setExpectedGuests(request.getExpectedGuests());
        event.setBookedSeats(0);
        event.setVisibility(request.getVisibility());
        event.setAccessCode(request.getVisibility() == VisibilityType.PRIVATE ? request.getAccessCode() : null);
        event.setTicketType(request.getTicketType());
        event.setTicketPrice(request.getTicketPrice());
        event.setVenueCost(venueCost);
        event.setDecorationCost(decorationCost);
        event.setFoodCost(foodCost);
        event.setPlatformFee(PLATFORM_FEE);
        event.setTotalCost(totalCost);
        event.setStatus(EventStatus.CONFIRMED);
        event.setRegistrationDeadline(registrationDeadline);

        Event saved = eventRepository.save(event);
        return mapToResponse(saved);
    }

    public EventResponse getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        return mapToResponse(event);
    }

    public List<EventResponse> getEventsByOrganizer(Long organizerId) {
        return eventRepository.findByOrganizerIdOrderByCreatedAtDesc(organizerId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public EventResponse cancelEvent(Long id, CancelEventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        event.setStatus(EventStatus.CANCELLED);
        Event saved = eventRepository.save(event);
        return mapToResponse(saved);
    }

    @Transactional
    public EventResponse rescheduleEvent(Long id, RescheduleEventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End time must be after start time");
        }

        LocalDateTime eventStartDateTime = LocalDateTime.of(request.getEventDate(), request.getStartTime());
        LocalDateTime registrationDeadline = eventStartDateTime.minusHours(24);

        event.setEventDate(request.getEventDate());
        event.setStartTime(request.getStartTime());
        event.setEndTime(request.getEndTime());
        event.setRegistrationDeadline(registrationDeadline);
        event.setStatus(EventStatus.RESCHEDULED);

        Event saved = eventRepository.save(event);
        return mapToResponse(saved);
    }

    private void validateBaseRequest(CreateEventRequest request) {
        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End time must be after start time");
        }

        if (request.getEventDate() == null || request.getEventDate().isBefore(java.time.LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event date must be today or in the future");
        }
    }

    private void validateCompatibility(
            CreateEventRequest request,
            Venue venue,
            DecorationVendor decorationVendor,
            FoodVendor foodVendor
    ) {
        if (!"ACTIVE".equalsIgnoreCase(venue.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selected venue is not active");
        }
        if (!"ACTIVE".equalsIgnoreCase(decorationVendor.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selected decoration vendor is not active");
        }
        if (!"ACTIVE".equalsIgnoreCase(foodVendor.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selected food vendor is not active");
        }

        if (!venue.getCityId().equals(request.getCityId()) || !venue.getEventTypeId().equals(request.getEventTypeId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Venue does not belong to selected city/event type");
        }

        if (!decorationVendor.getCityId().equals(request.getCityId()) || !decorationVendor.getEventTypeId().equals(request.getEventTypeId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Decoration vendor does not belong to selected city/event type");
        }

        if (!foodVendor.getCityId().equals(request.getCityId()) || !foodVendor.getEventTypeId().equals(request.getEventTypeId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Food vendor does not belong to selected city/event type");
        }
    }

    private EventResponse mapToResponse(Event event) {
        return new EventResponse(
                event.getId(),
                event.getOrganizerId(),
                event.getCityId(),
                event.getEventTypeId(),
                event.getVenueId(),
                event.getDecorationVendorId(),
                event.getFoodVendorId(),
                event.getTitle(),
                event.getDescription(),
                event.getEventDate(),
                event.getStartTime(),
                event.getEndTime(),
                event.getSeatCapacity(),
                event.getExpectedGuests(),
                event.getBookedSeats(),
                event.getVisibility(),
                event.getAccessCode(),
                event.getTicketType(),
                event.getTicketPrice(),
                event.getVenueCost(),
                event.getDecorationCost(),
                event.getFoodCost(),
                event.getPlatformFee(),
                event.getTotalCost(),
                event.getStatus(),
                event.getRegistrationDeadline()
        );
    }
}