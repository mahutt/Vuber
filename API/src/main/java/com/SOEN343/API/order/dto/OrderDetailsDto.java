package com.SOEN343.API.order.dto;

public class OrderDetailsDto {
    private ParcelDetailsDto parcels[];
    private double total;
    private CoordinatesDto originCoordinates;
    private CoordinatesDto destinationCoordinates;

    public ParcelDetailsDto[] getParcels() {
        return parcels;
    }

    public void setParcels(ParcelDetailsDto[] parcels) {
        this.parcels = parcels;
    }

    public double getTotal() {
        return total;
    }

    public CoordinatesDto getOriginCoordinates() {
        return originCoordinates;
    }

    public CoordinatesDto getDestinationCoordinates() {
        return destinationCoordinates;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public void setOriginCoordinates(CoordinatesDto originCoordinates) {
        this.originCoordinates = originCoordinates;
    }

    public void setDestinationCoordinates(CoordinatesDto destinationCoordinates) {
        this.destinationCoordinates = destinationCoordinates;
    }
}
