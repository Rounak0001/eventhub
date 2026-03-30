package com.eventhub.event.entity;

import com.eventhub.event.enums.VendorTier;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "decoration_vendors")
@Getter
@Setter
public class DecorationVendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "city_id")
    private Long cityId;

    @Column(name = "event_type_id")
    private Long eventTypeId;

    private String name;

    @Enumerated(EnumType.STRING)
    private VendorTier tier;

    private BigDecimal price;

    @Column(name = "image_url")
    private String imageUrl;

    private String status;
}