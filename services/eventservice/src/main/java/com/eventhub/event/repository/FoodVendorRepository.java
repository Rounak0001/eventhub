package com.EventZen.event.repository;

import com.EventZen.event.entity.FoodVendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodVendorRepository extends JpaRepository<FoodVendor, Long> {
}