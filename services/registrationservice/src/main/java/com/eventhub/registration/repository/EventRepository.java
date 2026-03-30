package com.EventZen.registration.repository;

import com.EventZen.registration.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}