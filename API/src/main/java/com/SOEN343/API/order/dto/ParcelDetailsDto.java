package com.SOEN343.API.order.dto;

public class ParcelDetailsDto {
    String name;
    Double weight;
    String weightunit;
    int width;
    int length;
    int height;
    String sizeUnit;
    String description;

    public String getName() {
        return name;
    }

    public Double getWeight() {
        return weight;
    }

    public String getWeightunit() {
        return weightunit;
    }

    public int getWidth() {
        return width;
    }

    public int getLength() {
        return length;
    }

    public int getHeight() {
        return height;
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

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public void setWeightunit(String weightunit) {
        this.weightunit = weightunit;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public void setSizeUnit(String sizeUnit) {
        this.sizeUnit = sizeUnit;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
