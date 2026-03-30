package com.eventhub.catalog.service;

import com.eventhub.catalog.dto.EventOptionsResponse;
import com.eventhub.catalog.entity.City;
import com.eventhub.catalog.entity.DecorationVendor;
import com.eventhub.catalog.entity.EventType;
import com.eventhub.catalog.entity.FoodVendor;
import com.eventhub.catalog.entity.Venue;
import com.eventhub.catalog.enums.VendorTier;
import com.eventhub.catalog.repository.CityRepository;
import com.eventhub.catalog.repository.DecorationVendorRepository;
import com.eventhub.catalog.repository.EventTypeRepository;
import com.eventhub.catalog.repository.FoodVendorRepository;
import com.eventhub.catalog.repository.VenueRepository;
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
            return decorationVendorRepository.findByCityIdAndEventTypeIdAndStatusIgnoreCase(cityId, eventTypeId, "ACTIVE");
        }
        VendorTier vendorTier = VendorTier.valueOf(tier.toUpperCase());
        return decorationVendorRepository.findByCityIdAndEventTypeIdAndTierAndStatusIgnoreCase(
                cityId, eventTypeId, vendorTier, "ACTIVE"
        );
    }

    public List<FoodVendor> getFoodVendors(Long cityId, Long eventTypeId, String tier) {
        if (tier == null || tier.isBlank()) {
            return foodVendorRepository.findByCityIdAndEventTypeIdAndStatusIgnoreCase(cityId, eventTypeId, "ACTIVE");
        }
        VendorTier vendorTier = VendorTier.valueOf(tier.toUpperCase());
        return foodVendorRepository.findByCityIdAndEventTypeIdAndTierAndStatusIgnoreCase(
                cityId, eventTypeId, vendorTier, "ACTIVE"
        );
    }

    public EventOptionsResponse getEventOptions(Long cityId, Long eventTypeId, String tier) {
        List<Venue> venues = getVenues(cityId, eventTypeId);
        List<DecorationVendor> decorationVendors = getDecorationVendors(cityId, eventTypeId, tier);
        List<FoodVendor> foodVendors = getFoodVendors(cityId, eventTypeId, tier);

        return new EventOptionsResponse(venues, decorationVendors, foodVendors);
    }
}