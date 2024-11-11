package com.SOEN343.API.order;

import com.SOEN343.API.Coordinates.Coordinate;
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

    public Coordinate getMidPoint(Coordinate curr, Coordinate dest) {
        double midpointX = ((dest.getX() + curr.getX())) / 2;
        double midpointY = ((dest.getY() + curr.getY())) / 2;
        return new Coordinate(midpointX, midpointY);
    }

}