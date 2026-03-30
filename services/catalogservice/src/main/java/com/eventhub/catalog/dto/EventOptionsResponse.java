package com.eventhub.catalog.dto;

import com.eventhub.catalog.entity.DecorationVendor;
import com.eventhub.catalog.entity.FoodVendor;
import com.eventhub.catalog.entity.Venue;
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