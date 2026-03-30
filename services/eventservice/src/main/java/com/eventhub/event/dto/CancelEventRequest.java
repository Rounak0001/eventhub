package com.EventZen.event.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CancelEventRequest {

    @NotBlank
    private String reason;
}