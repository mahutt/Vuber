package com.SOEN343.API.order;

import jakarta.persistence.*;

// database entity for order class
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId; 

    @Column(name = "status")
    private String status;

    public Order() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
        }
        
    public String getStatus() {
        return status;
    }
        
    public void setStatus(String status) {
       this.status = status;
    }

}


// post make order
// payment, fetch to quote calculator
// on success payment, then order details will be sent to backend


// get quote endpoint


// order controller end point post
// create order instance in db, associate with order, generate the trajectory for the order, assign the driver
// just show orders themselves for now

// /post/api/orders/new , save this with the user 

// /post/api/orders/new in the body of


// parcel Parcel.java in a different folder parcel
// parcel ParcelRepo needed probably

// trajectory

// deliver 

// 


