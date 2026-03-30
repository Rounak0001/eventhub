package com.EventZen.notification.dto;

import com.EventZen.notification.enums.EmailType;
import lombok.Data;

import java.util.Map;

@Data
public class NotificationRequest {
    private String email;
    private EmailType type;
    private Map<String, String> data;
}