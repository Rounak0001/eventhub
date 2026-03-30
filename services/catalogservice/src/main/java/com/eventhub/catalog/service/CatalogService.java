package com.EventZen.catalog.service;

import com.EventZen.catalog.dto.EventOptionsResponse;
import com.EventZen.catalog.entity.City;
import com.EventZen.catalog.entity.DecorationVendor;
import com.EventZen.catalog.entity.EventType;
import com.EventZen.catalog.entity.FoodVendor;
import com.EventZen.catalog.entity.Venue;
import com.EventZen.catalog.enums.VendorTier;
import com.EventZen.catalog.repository.CityRepository;
import com.EventZen.catalog.repository.DecorationVendorRepository;
import com.EventZen.catalog.repository.EventTypeRepository;
import com.EventZen.catalog.repository.FoodVendorRepository;
import com.EventZen.catalog.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final CityRepository cityRepository;
    private final EventTypeRepository eventTypeRepository;
    private final VenueRepository venueRepository;
    private final DecorationVendorRepository decorationVendorRepository;
    private final FoodVendorRepository foodVendorRepository;

    public List<City> getCities() {
        return cityRepository.findAll();
    }

    public List<EventType> getEventTypes() {
        return eventTypeRepository.findAll();
    }

    public List<Venue> getVenues(Long cityId, Long eventTypeId) {
        return venueRepository.findByCityIdAndEventTypeIdAndStatusIgnoreCase(cityId, eventTypeId, "ACTIVE");
    }

    public List<DecorationVendor> getDecorationVendors(Long cityId, Long eventTypeId, String tier) {
        if (tier == null || tier.isBlank()) {
            return decorationVendorRepository.findByCityIdAndEventTypeIdAndStatusIgnoreCase(cityId, eventTypeId,
                    "ACTIVE");
        }
        VendorTier vendorTier = VendorTier.valueOf(tier.toUpperCase());
        return decorationVendorRepository.findByCityIdAndEventTypeIdAndTierAndStatusIgnoreCase(
                cityId, eventTypeId, vendorTier, "ACTIVE");
    }

    public List<FoodVendor> getFoodVendors(Long cityId, Long eventTypeId, String tier) {
        if (tier == null || tier.isBlank()) {
            return foodVendorRepository.findByCityIdAndEventTypeIdAndStatusIgnoreCase(cityId, eventTypeId, "ACTIVE");
        }
        VendorTier vendorTier = VendorTier.valueOf(tier.toUpperCase());
        return foodVendorRepository.findByCityIdAndEventTypeIdAndTierAndStatusIgnoreCase(
                cityId, eventTypeId, vendorTier, "ACTIVE");
    }

    public EventOptionsResponse getEventOptions(Long cityId, Long eventTypeId, String tier) {
        List<Venue> venues = getVenues(cityId, eventTypeId);
        List<DecorationVendor> decorationVendors = getDecorationVendors(cityId, eventTypeId, tier);
        List<FoodVendor> foodVendors = getFoodVendors(cityId, eventTypeId, tier);

        return new EventOptionsResponse(venues, decorationVendors, foodVendors);
    }
}