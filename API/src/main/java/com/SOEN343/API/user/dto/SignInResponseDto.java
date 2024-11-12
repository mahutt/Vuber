package com.SOEN343.API.user.dto;

public record SignInResponseDto(
        String accessToken,
        UserDto user) {
    public SignInResponseDto(String accessToken, UserDto user) {
        this.accessToken = accessToken;
        this.user = user;
    }
}