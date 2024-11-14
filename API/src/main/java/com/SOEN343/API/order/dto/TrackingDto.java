package com.SOEN343.API.order.dto;

import java.util.List;

import com.SOEN343.API.Coordinates.Coordinate;
import com.SOEN343.API.user.User;

public class TrackingDto {

    private Coordinate originCoordinate;
    private Coordinate currentCoordinate;
    private Coordinate destinationCoordinate;
    private List<Coordinate> previousCoordinates;
    private String status;
    private User user;

    public TrackingDto(Coordinate originCoordiante, Coordinate currentCoordinate, Coordinate destinationCoordinate,
            List<Coordinate> previousCoordinates,
            String status, User user) {
        this.originCoordinate = originCoordiante;
        this.status = status;
        this.currentCoordinate = currentCoordinate;
        this.destinationCoordinate = destinationCoordinate;
        this.previousCoordinates = previousCoordinates;
        this.user = user;
    }

    public Coordinate getCurrentCoordinate() {
        return currentCoordinate;
    }

    public void setCurrentCoordinate(Coordinate currentCoordinate) {
        this.currentCoordinate = currentCoordinate;
    }

    public List<Coordinate> getPreviousCoordinates() {
        return previousCoordinates;
    }

    public void setPreviousCoordinates(List<Coordinate> previousCoordinates) {
        this.previousCoordinates = previousCoordinates;
    }

    public String getStatus() {
        return status;
    }

    public Coordinate getDestinationCoordinate() {
        return destinationCoordinate;
    }

    public void setDestinationCoordinate(Coordinate destinationCoordinate) {
        this.destinationCoordinate = destinationCoordinate;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Coordinate getOriginCoordinate() {
        return originCoordinate;
    }

    public void setOriginCoordinate(Coordinate originCoordinate) {
        this.originCoordinate = originCoordinate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
