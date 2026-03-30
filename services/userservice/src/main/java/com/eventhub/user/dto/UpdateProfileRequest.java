package com.EventZen.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {

    private String name;
    private String phone;
    private String avatarUrl;
    private String city;

    private String bio;
    private String address;
}