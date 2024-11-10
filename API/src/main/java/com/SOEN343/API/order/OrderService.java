package com.SOEN343.API.order;

import com.SOEN343.API.Coordinates.Coordinates;
import com.SOEN343.API.parcel.Parcel;
import com.SOEN343.API.parcel.ParcelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ParcelRepository parcelRepository;

    public Order createOrder(Order order) {
        // trajectory ?
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUserId(int userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(int orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    public List<Parcel> getParcelsByOrderId(int orderId) {
        return parcelRepository.findByOrderId(orderId);
    }

    public void updateOrderStatus(int orderId, String status) {
        Order order = getOrderById(orderId);
        if (order != null) {
            order.setStatus(status);
            orderRepository.save(order);
        }
    }

    public Coordinates getMidPoint(Coordinates curr, Coordinates dest){

        double midpointX;
        double midpointY;

        midpointX = ((dest.getxCoord() + curr.getxCoord()))/2;
        midpointY = ((dest.getyCoord() + curr.getyCoord()))/2;

        return new Coordinates(midpointX, midpointY);


    }

}