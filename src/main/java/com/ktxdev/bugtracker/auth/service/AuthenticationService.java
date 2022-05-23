package com.ktxdev.bugtracker.auth.service;

import com.ktxdev.bugtracker.auth.dto.AuthenticationRequestDto;
import com.ktxdev.bugtracker.auth.dto.AuthenticationResponseDto;

public interface AuthenticationService {
    AuthenticationResponseDto authenticate(AuthenticationRequestDto requestDto);

    AuthenticationResponseDto authenticateDemoAdmin();
}
