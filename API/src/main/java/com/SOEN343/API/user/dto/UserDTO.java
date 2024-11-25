package com.SOEN343.API.user.dto;

import java.util.Set;

import com.SOEN343.API.order.Order;
import com.SOEN343.API.user.User;

public record UserDto(
        int id,
        String name,
        String role,
        Set<Order> orders,
        Set<Order> assignedOrders) {

    public UserDto(User user) {
        this(user.getId(), user.getUsername(), user.getRole().toString(), user.getOrders(), user.getAssignedOrders());
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public String getRole() {
        return role;
    }

}