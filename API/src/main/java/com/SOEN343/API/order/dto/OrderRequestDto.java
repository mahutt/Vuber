package com.SOEN343.API.order.dto;

public class OrderRequestDto {
    private OrderDetailsDto orderDetails;
    private String token;

    public OrderDetailsDto getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(OrderDetailsDto orderDetails) {
        this.orderDetails = orderDetails;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}