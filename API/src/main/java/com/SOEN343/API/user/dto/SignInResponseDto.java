package com.SOEN343.API.user.dto;

import com.SOEN343.API.user.User;

public record SignInResponseDto(
        String accessToken,
        User user) {
            public SignInResponseDto(String accessToken, User user) {
                this.accessToken = accessToken;
                this.user = user;
            }
}