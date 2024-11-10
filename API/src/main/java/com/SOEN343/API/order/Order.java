package com.SOEN343.API.order;

import java.util.ArrayList;
import java.util.List;

import com.SOEN343.API.Coordinates.Coordinates;
import com.SOEN343.API.parcel.Parcel;
import com.SOEN343.API.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

// database entity for order class
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @JsonBackReference
    @ManyToOne
    private User user;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL)
    private List<Parcel> parcels;

    @Column
    private String status;

    @Column(nullable = true)
    private Double total;

    // location (from and to)

    @Column(name = "origin")
    private String origin;

    @Column(name = "destination")
    private String destination;

    // private List<Coordinates> prevCoordinates = new ArrayList<>();

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "xCoord", column = @Column(name = "origin_x_coord")),
            @AttributeOverride(name = "yCoord", column = @Column(name = "origin_y_coord"))
    })
    private Coordinates originCoords;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "xCoord", column = @Column(name = "destination_x_coord")),
            @AttributeOverride(name = "yCoord", column = @Column(name = "destination_y_coord"))
    })
    private Coordinates destinationCoords;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "xCoord", column = @Column(name = "current_x_coord")),
            @AttributeOverride(name = "yCoord", column = @Column(name = "current_y_coord"))
    })
    private Coordinates currentCoordinates;

    @ElementCollection
    private List<Coordinates> prevCoordinates = new ArrayList<>();

    public Order() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public List<Parcel> getParcels() {
        return parcels;
    }

    public void setParcels(List<Parcel> parcels) {
        this.parcels = parcels;
    }

    public Coordinates getOriginCoords() {
        return originCoords;
    }

    public void setOriginCoords(Coordinates originCoords) {
        this.originCoords = originCoords;
    }

    public Coordinates getDestinationCoords() {
        return destinationCoords;
    }

    public void setDestinationCoords(Coordinates destinationCoords) {
        this.destinationCoords = destinationCoords;
    }

    public Coordinates getCurrentCoordinates() {
        return currentCoordinates;
    }

    public void setCurrentCoordinates(Coordinates currentCoordinates) {
        this.currentCoordinates = currentCoordinates;
    }

    public List<Coordinates> getPrevCoordinates() {
        return prevCoordinates;
    }

    public void setPrevCoordinates(List<Coordinates> prevCoordinates) {
        this.prevCoordinates = prevCoordinates;
    }

}
