package com.EventZen.catalog.repository;

import com.EventZen.catalog.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}