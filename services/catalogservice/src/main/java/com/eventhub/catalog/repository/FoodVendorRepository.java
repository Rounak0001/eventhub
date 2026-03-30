package com.eventhub.catalog.repository;

import com.eventhub.catalog.entity.FoodVendor;
import com.eventhub.catalog.enums.VendorTier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodVendorRepository extends JpaRepository<FoodVendor, Long> {
    List<FoodVendor> findByCityIdAndEventTypeIdAndStatusIgnoreCase(Long cityId, Long eventTypeId, String status);
    List<FoodVendor> findByCityIdAndEventTypeIdAndTierAndStatusIgnoreCase(Long cityId, Long eventTypeId, VendorTier tier, String status);
}