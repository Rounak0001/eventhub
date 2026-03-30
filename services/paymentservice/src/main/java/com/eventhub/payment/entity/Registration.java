package com.EventZen.payment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "registrations")
@Getter
@Setter
public class Registration {

    @Id
    private Long id;

    @Column(name = "payment_status")
    private String paymentStatus;
}