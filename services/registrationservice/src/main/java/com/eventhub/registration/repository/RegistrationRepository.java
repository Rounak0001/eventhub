package com.EventZen.registration.repository;

import com.EventZen.registration.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    Optional<Registration> findByEventIdAndUserId(Long eventId, Long userId);

    List<Registration> findByUserId(Long userId);

    List<Registration> findByEventId(Long eventId);
}