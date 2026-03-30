package com.EventZen.catalog.repository;

import com.EventZen.catalog.entity.DecorationVendor;
import com.EventZen.catalog.enums.VendorTier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DecorationVendorRepository extends JpaRepository<DecorationVendor, Long> {
    List<DecorationVendor> findByCityIdAndEventTypeIdAndStatusIgnoreCase(Long cityId, Long eventTypeId, String status);

    List<DecorationVendor> findByCityIdAndEventTypeIdAndTierAndStatusIgnoreCase(Long cityId, Long eventTypeId,
            VendorTier tier, String status);
}