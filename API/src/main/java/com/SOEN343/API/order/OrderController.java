package com.SOEN343.API.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // creating a new order
    @PostMapping("/new")
    public Order createOrder(@RequestBody Order order) {
        // need to handle payment, quote fetching, trajectory generation, etc.
        // just saving the order to the database for now
        return orderRepository.save(order);
    }

    // get all orders (for now)
    @GetMapping("/")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

}
