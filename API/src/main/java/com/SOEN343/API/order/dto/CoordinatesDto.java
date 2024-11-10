package com.SOEN343.API.order.dto;

public class CoordinatesDto {
    double lat;
    double lng;
    public double getLat() {
        return lat;
    }
    public double getLng() {
        return lng;
    }
    @Override
    public String toString() {
        return "CoordinatesDto [lat=" + lat + ", lng=" + lng + "]";
    }
    
}
