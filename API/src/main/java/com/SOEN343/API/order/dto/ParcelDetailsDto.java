package com.SOEN343.API.order.dto;

public class ParcelDetailsDto {
    String name;
    double weight;
    String weightUnit;
    SizeDto size;
    String sizeUnit;
    String description;

    public String getName() {
        return name;
    }

    public double getWeight() {
        return weight;
    }

    public String getWeightUnit() {
        return weightUnit;
    }

    public String getSizeUnit() {
        return sizeUnit;
    }

    public String getDescription() {
        return description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public void setWeightUnit(String weightunit) {
        this.weightUnit = weightunit;
    }

    public void setSizeUnit(String sizeUnit) {
        this.sizeUnit = sizeUnit;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SizeDto getSize() {
        return size;
    }

    public void setSize(SizeDto size) {
        this.size = size;
    }

    
}
