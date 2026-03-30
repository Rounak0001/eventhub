package com.EventZen.catalog.repository;

import com.EventZen.catalog.entity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventTypeRepository extends JpaRepository<EventType, Long> {
}