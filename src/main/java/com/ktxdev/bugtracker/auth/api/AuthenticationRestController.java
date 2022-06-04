package com.ktxdev.bugtracker.auth.api;

import com.ktxdev.bugtracker.auth.dto.AuthenticationRequestDto;
import com.ktxdev.bugtracker.auth.dto.AuthenticationResponseDto;
import com.ktxdev.bugtracker.auth.service.AuthenticationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(tags = "Authentication")
@RequestMapping("api/v1/authenticate")
public class AuthenticationRestController {

    private final AuthenticationService authenticationService;

    @PostMapping
    @ApiOperation("Login/Sign In")
    public ResponseEntity<AuthenticationResponseDto> authenticate(
            @RequestBody AuthenticationRequestDto requestDto
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(requestDto));
    }

    @PostMapping("demo-admin")
    @ApiOperation("Login/Sign In As Demo Admin")
    public ResponseEntity<AuthenticationResponseDto> authenticateDemoAdmin() {
        return ResponseEntity.ok(authenticationService.authenticateDemoAdmin());
    }

    @PostMapping("demo-user")
    @ApiOperation("Login/Sign In As Demo User")
    public ResponseEntity<AuthenticationResponseDto> authenticateDemoUser() {
        return ResponseEntity.ok(authenticationService.authenticateDemoUser());
    }

}
