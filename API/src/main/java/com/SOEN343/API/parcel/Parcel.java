package com.SOEN343.API.parcel;

import com.SOEN343.API.order.Order;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "parcel")
public class Parcel {

    public static WeightUnit getWeightEnumValue(String stringValue) {
        if (stringValue.equals("kg")) {
            return WeightUnit.KG;
        } else if (stringValue.equals("lb")) {
            return WeightUnit.LB;
        } else {
            // Default
            return WeightUnit.LB;
        }
    }

    public static SizeUnit getSizeEnumValue(String stringValue) {
        if (stringValue.equals("cm")) {
            return SizeUnit.CM;
        } else if (stringValue.equals("in")) {
            return SizeUnit.IN;
        } else {
            // Default
            return SizeUnit.IN;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @JsonBackReference
    @ManyToOne
    private Order order;

    @Column
    private String name;

    @Column
    private Double weight;

    @Column
    private WeightUnit weightunit;

    @Column
    private int width;

    @Column
    private int length;

    @Column
    private int height;

    @Column
    private SizeUnit sizeUnit;

    @Column(nullable = true)
    private String description;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public WeightUnit getWeightunit() {
        return weightunit;
    }

    public void setWeightunit(WeightUnit weightunit) {
        this.weightunit = weightunit;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public SizeUnit getSizeUnit() {
        return sizeUnit;
    }

    public void setSizeUnit(SizeUnit sizeUnit) {
        this.sizeUnit = sizeUnit;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}

enum WeightUnit {
    LB, KG
}

enum SizeUnit {
    IN, CM
}
