package com.SOEN343.API.parcel;

import jakarta.persistence.*;

@Entity
@Table(name = "parcel")
public class Parcel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "destination")
    private String destination;

    // Getters and Setters
}
