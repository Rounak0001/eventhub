package com.eventhub.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileSetupRequest {

    @NotNull
    private Long userId;

    private String bio;
    private String address;
    private String preferredEventType;
}