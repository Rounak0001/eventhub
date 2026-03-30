package com.eventhub.catalog.repository;

import com.eventhub.catalog.entity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventTypeRepository extends JpaRepository<EventType, Long> {
}