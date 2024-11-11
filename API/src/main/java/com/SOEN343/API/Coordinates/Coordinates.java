package com.SOEN343.API.Coordinates;

import jakarta.persistence.Embeddable;

@Embeddable
public class Coordinates {
    double xCoord;
    double yCoord;

    public Coordinates(double xCoord, double yCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
    }

    public Coordinates() {

    }

    public double getxCoord() {
        return xCoord;
    }

    public void setxCoord(double xCoord) {
        this.xCoord = xCoord;
    }

    public double getyCoord() {
        return yCoord;
    }

    public void setyCoord(double yCoord) {
        this.yCoord = yCoord;
    }

    public double distanceTo(Coordinates other) {
        return Math.sqrt(Math.pow(this.xCoord - other.xCoord, 2) + Math.pow(this.yCoord - other.yCoord, 2));
    }

}
