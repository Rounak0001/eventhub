package com.eventhub.user.service;

import com.eventhub.user.dto.ProfileResponse;
import com.eventhub.user.dto.ProfileSetupRequest;
import com.eventhub.user.dto.UpdateProfileRequest;
import com.eventhub.user.entity.User;
import com.eventhub.user.entity.UserProfile;
import com.eventhub.user.repository.UserProfileRepository;
import com.eventhub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    @Transactional
    public ProfileResponse setupProfile(ProfileSetupRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        UserProfile profile = userProfileRepository.findByUserId(request.getUserId())
                .orElseGet(UserProfile::new);

        profile.setUserId(user.getId());
        profile.setBio(request.getBio());
        profile.setAddress(request.getAddress());
        profile.setCompanyName(request.getCompanyName());
        profile.setPreferredEventType(request.getPreferredEventType());

        UserProfile savedProfile = userProfileRepository.save(profile);
        return mapToResponse(user, savedProfile);
    }

    public ProfileResponse getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElse(null);

        return mapToResponse(user, profile);
    }

    @Transactional
    public ProfileResponse updateProfile(Long userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (request.getName() != null && !request.getName().isBlank()) {
            user.setName(request.getName().trim());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getAvatarUrl() != null) {
            user.setAvatarUrl(request.getAvatarUrl());
        }
        if (request.getCity() != null) {
            user.setCity(request.getCity());
        }

        User savedUser = userRepository.save(user);

        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    UserProfile newProfile = new UserProfile();
                    newProfile.setUserId(userId);
                    return newProfile;
                });

        if (request.getBio() != null) {
            profile.setBio(request.getBio());
        }
        if (request.getAddress() != null) {
            profile.setAddress(request.getAddress());
        }
        if (request.getCompanyName() != null) {
            profile.setCompanyName(request.getCompanyName());
        }
        if (request.getPreferredEventType() != null) {
            profile.setPreferredEventType(request.getPreferredEventType());
        }

        UserProfile savedProfile = userProfileRepository.save(profile);
        return mapToResponse(savedUser, savedProfile);
    }

    private ProfileResponse mapToResponse(User user, UserProfile profile) {
        return new ProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getPhone(),
                user.getAvatarUrl(),
                user.getCity(),
                user.getIsActive(),
                profile != null ? profile.getBio() : null,
                profile != null ? profile.getAddress() : null,
                profile != null ? profile.getCompanyName() : null,
                profile != null ? profile.getPreferredEventType() : null
        );
    }
}