package com.SOEN343.API.order.dto;

public class OrderDetailsDto {
    private ParcelDetailsDto parcels[];
    private double total;
    private CoordinatesDto originCoordinates;
    private CoordinatesDto destinationCoordinates;
    private String pickupInstructions;
    private String dropoffInstructions;

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

    public String getPickupInstructions() {
        return pickupInstructions;
    }

    public void setPickupInstructions(String pickupInstructions) {
        this.pickupInstructions = pickupInstructions;
    }

    public String getDropoffInstructions() {
        return dropoffInstructions;
    }

    public void setDropoffInstructions(String dropoffInstructions) {
        this.dropoffInstructions = dropoffInstructions;
    }
}
