package com.eventhub.catalog.repository;

import com.eventhub.catalog.entity.DecorationVendor;
import com.eventhub.catalog.enums.VendorTier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DecorationVendorRepository extends JpaRepository<DecorationVendor, Long> {
    List<DecorationVendor> findByCityIdAndEventTypeIdAndStatusIgnoreCase(Long cityId, Long eventTypeId, String status);
    List<DecorationVendor> findByCityIdAndEventTypeIdAndTierAndStatusIgnoreCase(Long cityId, Long eventTypeId, VendorTier tier, String status);
}