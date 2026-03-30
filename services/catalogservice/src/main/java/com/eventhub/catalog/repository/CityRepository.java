package com.eventhub.catalog.repository;

import com.eventhub.catalog.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}