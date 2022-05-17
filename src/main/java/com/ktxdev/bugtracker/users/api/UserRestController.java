package com.ktxdev.bugtracker.users.api;

import com.ktxdev.bugtracker.users.dto.UserDto;
import com.ktxdev.bugtracker.users.model.User;
import com.ktxdev.bugtracker.users.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.security.Principal;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
@Slf4j(topic = "User Rest Controller")
public class UserRestController {

    private final UserService userService;

    @PostMapping("v1/users")
    @PreAuthorize("hasRole(T(com.ktxdev.bugtracker.users.model.UserRole).ADMIN.name())")
    public ResponseEntity<User> create(
            @RequestBody UserDto userDto,
            HttpServletRequest request
    ) {
        URI uri = ServletUriComponentsBuilder.fromRequestUri(request)
                .build().toUri();

        return ResponseEntity.created(uri)
                .body(userService.create(userDto));
    }

    @PostMapping("opn/v1/users/sign-up")
    public ResponseEntity<User> register(
            @RequestBody UserDto userDto,
            HttpServletRequest request
    ) {
        URI uri = ServletUriComponentsBuilder.fromRequestUri(request)
                .build().toUri();

        return ResponseEntity.created(uri)
                .body(userService.register(userDto));
    }

    @PutMapping("v1/users/{userId}")
    public ResponseEntity<User> update(
            @RequestBody UserDto userDto,
            @PathVariable long userId
    ) {
        userDto.setId(userId);
        return ResponseEntity.ok(userService.update(userDto));
    }

    @GetMapping("v1/users/profile")
    public ResponseEntity<User> profile(
            Principal principal
    ) {
        return ResponseEntity.ok(userService.profile(principal));
    }

    @GetMapping("v1/users")
    public ResponseEntity<Page<User>> getAllUser(
            @PageableDefault(sort = "lastName") Pageable pageable,
            @RequestParam(required = false) String q
    ) {
        return ResponseEntity.ok(userService.getAllUser(pageable, q));
    }
}
