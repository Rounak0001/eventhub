package com.eventhub.catalog.entity;

import com.eventhub.catalog.enums.VendorTier;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "food_vendors")
@Getter
@Setter
public class FoodVendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "city_id", nullable = false)
    private Long cityId;

    @Column(name = "event_type_id", nullable = false)
    private Long eventTypeId;

    @Column(nullable = false, length = 150)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private VendorTier tier;

    @Column(name = "price_per_plate", nullable = false, precision = 12, scale = 2)
    private BigDecimal pricePerPlate;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(length = 20)
    private String status;
}