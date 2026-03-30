package com.EventZen.registration.service;

import com.EventZen.registration.dto.RegistrationRequest;
import com.EventZen.registration.entity.Event;
import com.EventZen.registration.entity.Registration;
import com.EventZen.registration.repository.EventRepository;
import com.EventZen.registration.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;

    public Registration register(RegistrationRequest request) {

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Event not found"));

        // ✅ Correct status check
        if (!"CONFIRMED".equals(event.getStatus())) {
            throw new ResponseStatusException(BAD_REQUEST, "Event not active");
        }

        // ✅ Use DB deadline (better than 24h logic)
        if (event.getRegistrationDeadline() != null &&
                LocalDateTime.now().isAfter(event.getRegistrationDeadline())) {
            throw new ResponseStatusException(BAD_REQUEST, "Registration closed");
        }

        // ✅ Private access check
        if ("PRIVATE".equals(event.getVisibility())) {
            if (request.getAccessCode() == null ||
                    !request.getAccessCode().equals(event.getAccessCode())) {
                throw new ResponseStatusException(FORBIDDEN, "Invalid access code");
            }
        }

        // ✅ Prevent duplicate
        registrationRepository.findByEventIdAndUserId(request.getEventId(), request.getUserId())
                .ifPresent(r -> {
                    throw new ResponseStatusException(CONFLICT, "Already registered");
                });

        int qty = request.getQuantity() != null ? request.getQuantity() : 1;

        int booked = event.getBookedSeats() != null ? event.getBookedSeats() : 0;
        int capacity = event.getSeatCapacity() != null ? event.getSeatCapacity() : 0;

        // ✅ Capacity check
        if (booked + qty > capacity) {
            throw new ResponseStatusException(BAD_REQUEST, "Event full");
        }

        Registration reg = Registration.builder()
                .eventId(request.getEventId())
                .userId(request.getUserId())
                .attendeeName(request.getAttendeeName())
                .attendeeEmail(request.getAttendeeEmail())
                .attendeePhone(request.getAttendeePhone())
                .quantity(qty)
                .registrationStatus("CONFIRMED")
                .paymentStatus("PENDING")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        registrationRepository.save(reg);

        // ✅ Update seats safely
        event.setBookedSeats(booked + qty);
        eventRepository.save(event);

        return reg;
    }

    public void cancel(Long id) {

        Registration reg = registrationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Registration not found"));

        if ("CANCELLED".equals(reg.getRegistrationStatus()))
            return;

        Event event = eventRepository.findById(reg.getEventId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Event not found"));

        reg.setRegistrationStatus("CANCELLED");
        reg.setUpdatedAt(LocalDateTime.now());
        registrationRepository.save(reg);

        int booked = event.getBookedSeats() != null ? event.getBookedSeats() : 0;
        event.setBookedSeats(Math.max(0, booked - reg.getQuantity()));

        eventRepository.save(event);
    }

    public List<Registration> getByUser(Long userId) {
        return registrationRepository.findByUserId(userId);
    }

    public List<Registration> getByEvent(Long eventId) {
        return registrationRepository.findByEventId(eventId);
    }
}