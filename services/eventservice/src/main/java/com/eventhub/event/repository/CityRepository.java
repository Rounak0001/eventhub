package com.eventhub.event.repository;

import com.eventhub.event.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}