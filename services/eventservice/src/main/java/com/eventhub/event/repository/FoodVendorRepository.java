package com.eventhub.event.repository;

import com.eventhub.event.entity.FoodVendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodVendorRepository extends JpaRepository<FoodVendor, Long> {
}