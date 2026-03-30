package com.EventZen.catalog.repository;

import com.EventZen.catalog.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findByCityIdAndEventTypeIdAndStatusIgnoreCase(Long cityId, Long eventTypeId, String status);
}