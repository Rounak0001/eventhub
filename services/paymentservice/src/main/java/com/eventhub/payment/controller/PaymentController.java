package com.EventZen.payment.controller;

import com.EventZen.payment.entity.Payment;
import com.EventZen.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService service;

    @PostMapping("/process")
    public Payment process(
            @RequestParam Long registrationId,
            @RequestParam Long userId,
            @RequestParam Double amount) {
        return service.processPayment(registrationId, userId, amount);
    }
}