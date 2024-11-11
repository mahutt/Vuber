package com.SOEN343.API.order.dto;

import java.util.List;

import com.SOEN343.API.Coordinates.Coordinate;

public class TrackingDto {

    private Coordinate originCoordinates;
    private Coordinate newCurrLocation;
    private Coordinate destinationCoords;
    private List<Coordinate> prevCoords;
    private String status;

    public TrackingDto(Coordinate originCoordiantes, Coordinate newCurrLocation, Coordinate destinationCoordinates,
            List<Coordinate> prevCoords,
            String status) {
        this.originCoordinates = originCoordiantes;
        this.status = status;
        this.newCurrLocation = newCurrLocation;
        this.destinationCoords = destinationCoordinates;
        this.prevCoords = prevCoords;
    }

    public Coordinate getNewCurrLocation() {
        return newCurrLocation;
    }

    public void setNewCurrLocation(Coordinate newCurrLocation) {
        this.newCurrLocation = newCurrLocation;
    }

    public List<Coordinate> getPrevCoords() {
        return prevCoords;
    }

    public void setPrevCoords(List<Coordinate> prevCoords) {
        this.prevCoords = prevCoords;
    }

    public String getStatus() {
        return status;
    }

    public Coordinate getDestinationCoords() {
        return destinationCoords;
    }

    public void setDestinationCoords(Coordinate destinationCoords) {
        this.destinationCoords = destinationCoords;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Coordinate getOriginCoordinates() {
        return originCoordinates;
    }

    public void setOriginCoordinates(Coordinate originCoordinates) {
        this.originCoordinates = originCoordinates;
    }

}
