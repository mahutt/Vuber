package com.SOEN343.API.Coordinates;

import jakarta.persistence.Embeddable;

@Embeddable
public class Coordinate {
    double lat;
    double lng;

    public Coordinate(double lat, double lng) {
        this.lat = lat;
        this.lng = lng;
    }

    public Coordinate() {

    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public double distanceTo(Coordinate other) {
        return Math.sqrt(Math.pow(this.lat - other.lat, 2) + Math.pow(this.lng - other.lng, 2));
    }
}
