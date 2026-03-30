package com.EventZen.admin.controller;

import com.EventZen.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService service;

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        return service.getDashboard();
    }

    @GetMapping("/users")
    public List<?> users() {
        return service.getUsers();
    }

    @GetMapping("/events")
    public List<?> events() {
        return service.getEvents();
    }

    @GetMapping("/registrations")
    public List<?> registrations() {
        return service.getRegistrations();
    }

    @GetMapping("/payments")
    public List<?> payments() {
        return service.getPayments();
    }

    @PostMapping("/events/{id}/cancel")
    public void cancel(@PathVariable Long id) {
        service.cancelEvent(id);
    }

    @PostMapping("/events/{id}/reschedule")
    public void reschedule(
            @PathVariable Long id,
            @RequestParam String newDate) {
        service.rescheduleEvent(id, newDate);
    }
}