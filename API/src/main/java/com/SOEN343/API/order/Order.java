package com.SOEN343.API.order;

import java.util.List;

import com.SOEN343.API.parcel.Parcel;
import com.SOEN343.API.user.User;

import jakarta.persistence.*;

// database entity for order class
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    private User user;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Parcel> parcels;

    @Column
    private String status;

    @Column (nullable = true)
    private Double total;

    // location (from and to)

    @Column(name = "origin")
    private String origin;

    @Column(name = "destination")
    private String destination;

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

    public void setUser(User user2) {
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

}

