package com.eventhub.user.dto;

import com.eventhub.user.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProfileResponse {

    private Long userId;
    private String name;
    private String email;
    private UserRole role;
    private String phone;
    private String avatarUrl;
    private String city;
    private Boolean isActive;

    private String bio;
    private String address;
    private String preferredEventType;
}