package com.ktxdev.bugtracker.auth.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ktxdev.bugtracker.auth.dto.AuthenticationRequestDto;
import com.ktxdev.bugtracker.auth.dto.AuthenticationResponseDto;
import com.ktxdev.bugtracker.auth.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    @Value("system.jwt.secret")
    private String secret;

    @Value("${system.defaults.users.admin.email}")
    private String adminEmail;

    @Value("${system.defaults.users.admin.password}")
    private String adminPassword;

    @Value("${system.defaults.users.user.email}")
    private String userEmail;

    @Value("${system.defaults.users.user.password}")
    private String userPassword;

    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponseDto authenticate(AuthenticationRequestDto requestDto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(requestDto.getEmail(), requestDto.getPassword()));
        } catch (LockedException | DisabledException | BadCredentialsException ex) {
            log.error("### Authentication failed: {}", ex.getMessage());
            throw ex;
        }

        val user = (User) userDetailsService.loadUserByUsername(requestDto.getEmail());

        Algorithm algorithm = Algorithm.HMAC256(secret.getBytes(StandardCharsets.UTF_8));

        val accessToken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);

        val refreshToken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
                .sign(algorithm);

        return new AuthenticationResponseDto(accessToken, refreshToken);
    }

    @Override
    public AuthenticationResponseDto authenticateDemoAdmin() {
        val authRequest = AuthenticationRequestDto.builder()
                .email(adminEmail)
                .password(adminPassword)
                .build();

        return authenticate(authRequest);
    }

    @Override
    public AuthenticationResponseDto authenticateDemoUser() {
        val authRequest = AuthenticationRequestDto.builder()
                .email(userEmail)
                .password(userPassword)
                .build();

        return authenticate(authRequest);
    }
}
