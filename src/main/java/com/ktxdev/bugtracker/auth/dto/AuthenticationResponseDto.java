package com.ktxdev.bugtracker.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResponseDto {
    private String accessToken;

    private String refreshToken;
}
