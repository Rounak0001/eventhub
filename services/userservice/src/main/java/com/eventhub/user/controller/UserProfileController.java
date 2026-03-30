package com.EventZen.user.controller;

import com.EventZen.user.dto.ProfileResponse;
import com.EventZen.user.dto.ProfileSetupRequest;
import com.EventZen.user.dto.UpdateProfileRequest;
import com.EventZen.user.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @PostMapping("/setup")
    public ProfileResponse setupProfile(@Valid @RequestBody ProfileSetupRequest request) {
        return userProfileService.setupProfile(request);
    }

    @GetMapping("/{userId}")
    public ProfileResponse getProfile(@PathVariable Long userId) {
        return userProfileService.getProfile(userId);
    }

    @PutMapping("/{userId}")
    public ProfileResponse updateProfile(
            @PathVariable Long userId,
            @RequestBody UpdateProfileRequest request) {
        return userProfileService.updateProfile(userId, request);
    }
}