package com.SOEN343.API.user.dto;

public record SignUpDto(
                String name,
                String password,
                String role) {

        public String role() {
                return role;
        }
}