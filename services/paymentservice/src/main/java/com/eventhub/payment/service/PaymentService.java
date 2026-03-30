package com.EventZen.payment.service;

import com.EventZen.payment.entity.Payment;
import com.EventZen.payment.entity.Registration;
import com.EventZen.payment.repository.PaymentRepository;
import com.EventZen.payment.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final RegistrationRepository registrationRepository;

    public Payment processPayment(Long registrationId, Long userId, Double amount) {

        // 1. validate registration
        Registration reg = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Registration not found"));

        // 2. create payment (PENDING)
        Payment payment = Payment.builder()
                .registrationId(registrationId)
                .payerUserId(userId)
                .provider("DEMO")
                .amount(amount)
                .paymentType("REGISTRATION")
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        payment = paymentRepository.save(payment);

        // 3. simulate processing (instant success)
        payment.setStatus("SUCCESS");
        payment.setPaidAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());

        paymentRepository.save(payment);

        // 4. update registration payment status
        reg.setPaymentStatus("SUCCESS");
        registrationRepository.save(reg);

        return payment;
    }
}