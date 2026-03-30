package com.EventZen.payment.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "registration_id")
    private Long registrationId;

    @Column(name = "payer_user_id")
    private Long payerUserId;

    private String provider; // DEMO

    private Double amount;

    private String status; // PENDING / SUCCESS / FAILED

    @Column(name = "payment_type")
    private String paymentType; // REGISTRATION

    private LocalDateTime paidAt;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}