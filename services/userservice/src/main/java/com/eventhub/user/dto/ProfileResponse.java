package com.EventZen.user.dto;

import com.EventZen.user.enums.UserRole;
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
}