package com.EventZen.event.controller;

import com.EventZen.event.dto.CancelEventRequest;
import com.EventZen.event.dto.CreateEventRequest;
import com.EventZen.event.dto.EventResponse;
import com.EventZen.event.dto.RescheduleEventRequest;
import com.EventZen.event.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    public EventResponse createEvent(@Valid @RequestBody CreateEventRequest request) {
        return eventService.createEvent(request);
    }

    @GetMapping("/{id}")
    public EventResponse getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    @GetMapping("/organizer/{organizerId}")
    public List<EventResponse> getEventsByOrganizer(@PathVariable Long organizerId) {
        return eventService.getEventsByOrganizer(organizerId);
    }

    @PostMapping("/{id}/cancel")
    public EventResponse cancelEvent(@PathVariable Long id, @Valid @RequestBody CancelEventRequest request) {
        return eventService.cancelEvent(id, request);
    }

    @PostMapping("/{id}/reschedule")
    public EventResponse rescheduleEvent(@PathVariable Long id, @Valid @RequestBody RescheduleEventRequest request) {
        return eventService.rescheduleEvent(id, request);
    }
}