package com.EventZen.catalog.repository;

import com.EventZen.catalog.entity.FoodVendor;
import com.EventZen.catalog.enums.VendorTier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodVendorRepository extends JpaRepository<FoodVendor, Long> {
    List<FoodVendor> findByCityIdAndEventTypeIdAndStatusIgnoreCase(Long cityId, Long eventTypeId, String status);

    List<FoodVendor> findByCityIdAndEventTypeIdAndTierAndStatusIgnoreCase(Long cityId, Long eventTypeId,
            VendorTier tier, String status);
}