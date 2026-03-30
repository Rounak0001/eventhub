package com.EventZen.catalog.controller;

import com.EventZen.catalog.dto.EventOptionsResponse;
import com.EventZen.catalog.entity.City;
import com.EventZen.catalog.entity.DecorationVendor;
import com.EventZen.catalog.entity.EventType;
import com.EventZen.catalog.entity.FoodVendor;
import com.EventZen.catalog.entity.Venue;
import com.EventZen.catalog.service.CatalogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/catalog")
@RequiredArgsConstructor
public class CatalogController {

    private final CatalogService catalogService;

    @GetMapping("/cities")
    public List<City> getCities() {
        return catalogService.getCities();
    }

    @GetMapping("/event-types")
    public List<EventType> getEventTypes() {
        return catalogService.getEventTypes();
    }

    @GetMapping("/venues")
    public List<Venue> getVenues(
            @RequestParam Long cityId,
            @RequestParam Long eventTypeId) {
        return catalogService.getVenues(cityId, eventTypeId);
    }

    @GetMapping("/decoration-vendors")
    public List<DecorationVendor> getDecorationVendors(
            @RequestParam Long cityId,
            @RequestParam Long eventTypeId,
            @RequestParam(required = false) String tier) {
        return catalogService.getDecorationVendors(cityId, eventTypeId, tier);
    }

    @GetMapping("/food-vendors")
    public List<FoodVendor> getFoodVendors(
            @RequestParam Long cityId,
            @RequestParam Long eventTypeId,
            @RequestParam(required = false) String tier) {
        return catalogService.getFoodVendors(cityId, eventTypeId, tier);
    }

    @GetMapping("/event-options")
    public EventOptionsResponse getEventOptions(
            @RequestParam Long cityId,
            @RequestParam Long eventTypeId,
            @RequestParam(required = false) String tier) {
        return catalogService.getEventOptions(cityId, eventTypeId, tier);
    }
}