package com.EventZen.notification.controller;

import com.EventZen.notification.dto.NotificationRequest;
import com.EventZen.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService service;

    @PostMapping
    public Map<String, Object> send(@RequestBody NotificationRequest request) {
        System.out.println("CONTROLLER HIT /notifications");
        System.out.println("REQUEST EMAIL = " + request.getEmail());
        System.out.println("REQUEST TYPE = " + request.getType());
        return service.send(request);
    }
}