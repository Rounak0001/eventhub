package com.eventhub.auth.dto;

import com.eventhub.auth.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MeResponse {
    private Long id;
    private String name;
    private String email;
    private UserRole role;
    private String phone;
    private String city;
    private Boolean isActive;
}