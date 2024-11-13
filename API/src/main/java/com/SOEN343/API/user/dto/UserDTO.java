package com.SOEN343.API.user.dto;

import java.util.List;

import com.SOEN343.API.order.Order;
import com.SOEN343.API.user.User;

public record UserDto(
                int id,
                String name,
                List<Order> orders) {

        public UserDto(User user) {
                this(user.getId(), user.getUsername(), user.getOrders());
        }

        public int getId() {
                return id;
        }

        public String getName() {
                return name;
        }

        public List<Order> getOrders() {
                return orders;
        }

}