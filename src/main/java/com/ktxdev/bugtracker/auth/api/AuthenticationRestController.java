package com.ktxdev.bugtracker.auth.api;

import com.ktxdev.bugtracker.auth.dto.AuthenticationRequestDto;
import com.ktxdev.bugtracker.auth.dto.AuthenticationResponseDto;
import com.ktxdev.bugtracker.auth.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "Authentication")
@RequestMapping("api/v1/authenticate")
public class AuthenticationRestController {

    private final AuthenticationService authenticationService;

    @PostMapping
    @Operation(summary = "Login/Sign In")
    public ResponseEntity<AuthenticationResponseDto> authenticate(
            @RequestBody AuthenticationRequestDto requestDto
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(requestDto));
    }

    @PostMapping("demo-admin")
    @Operation(summary = "Login/Sign In As Demo Admin")
    public ResponseEntity<AuthenticationResponseDto> authenticateDemoAdmin() {
        return ResponseEntity.ok(authenticationService.authenticateDemoAdmin());
    }

    @PostMapping("demo-user")
    @Operation(summary = "Login/Sign In As Demo User")
    public ResponseEntity<AuthenticationResponseDto> authenticateDemoUser() {
        return ResponseEntity.ok(authenticationService.authenticateDemoUser());
    }

}
