package com.EventZen.registration.dto;

import lombok.Data;

@Data
public class RegistrationRequest {

    private Long eventId;
    private Long userId;

    private String attendeeName;
    private String attendeeEmail;
    private String attendeePhone;

    private Integer quantity;
    private String accessCode;
}