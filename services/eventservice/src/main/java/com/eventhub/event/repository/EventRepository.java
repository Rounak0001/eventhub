package com.EventZen.event.repository;

import com.EventZen.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByOrganizerIdOrderByCreatedAtDesc(Long organizerId);
}