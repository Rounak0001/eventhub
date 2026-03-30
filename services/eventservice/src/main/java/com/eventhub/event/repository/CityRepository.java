package com.EventZen.event.repository;

import com.EventZen.event.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}