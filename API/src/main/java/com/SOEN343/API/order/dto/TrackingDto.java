package com.SOEN343.API.order.dto;

import java.util.List;

import com.SOEN343.API.Coordinates.Coordinates;

public class TrackingDto {

    private Coordinates originCoordinates;
    private Coordinates newCurrLocation;
    private Coordinates destinationCoords;
    private List<Coordinates> prevCoords;
    private String status;

    public TrackingDto(Coordinates originCoordiantes, Coordinates newCurrLocation, Coordinates destinationCoordinates,
            List<Coordinates> prevCoords,
            String status) {
        this.originCoordinates = originCoordiantes;
        this.status = status;
        this.newCurrLocation = newCurrLocation;
        this.destinationCoords = destinationCoordinates;
        this.prevCoords = prevCoords;
    }

    public Coordinates getNewCurrLocation() {
        return newCurrLocation;
    }

    public void setNewCurrLocation(Coordinates newCurrLocation) {
        this.newCurrLocation = newCurrLocation;
    }

    public List<Coordinates> getPrevCoords() {
        return prevCoords;
    }

    public void setPrevCoords(List<Coordinates> prevCoords) {
        this.prevCoords = prevCoords;
    }

    public String getStatus() {
        return status;
    }

    public Coordinates getDestinationCoords() {
        return destinationCoords;
    }

    public void setDestinationCoords(Coordinates destinationCoords) {
        this.destinationCoords = destinationCoords;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Coordinates getOriginCoordinates() {
        return originCoordinates;
    }

    public void setOriginCoordinates(Coordinates originCoordinates) {
        this.originCoordinates = originCoordinates;
    }

}
