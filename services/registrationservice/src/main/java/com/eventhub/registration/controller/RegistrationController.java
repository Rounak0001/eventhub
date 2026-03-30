package com.EventZen.registration.controller;

import com.EventZen.registration.dto.RegistrationRequest;
import com.EventZen.registration.entity.Registration;
import com.EventZen.registration.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registrations")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService service;

    @PostMapping
    public Registration register(@RequestBody RegistrationRequest request) {
        return service.register(request);
    }

    @PostMapping("/{id}/cancel")
    public void cancel(@PathVariable Long id) {
        service.cancel(id);
    }

    @GetMapping("/user/{userId}")
    public List<Registration> getByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }

    @GetMapping("/event/{eventId}")
    public List<Registration> getByEvent(@PathVariable Long eventId) {
        return service.getByEvent(eventId);
    }
}