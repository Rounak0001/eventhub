package com.EventZen.catalog.dto;

import com.EventZen.catalog.entity.DecorationVendor;
import com.EventZen.catalog.entity.FoodVendor;
import com.EventZen.catalog.entity.Venue;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class EventOptionsResponse {
    private List<Venue> venues;
    private List<DecorationVendor> decorationVendors;
    private List<FoodVendor> foodVendors;
}