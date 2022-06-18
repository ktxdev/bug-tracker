package com.ktxdev.bugtracker.users.api;

import com.ktxdev.bugtracker.users.dto.UserDto;
import com.ktxdev.bugtracker.users.dto.UserPasswordUpdateDto;
import com.ktxdev.bugtracker.users.dto.UserUpdateDto;
import com.ktxdev.bugtracker.users.model.User;
import com.ktxdev.bugtracker.users.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import java.util.Collection;

@RestController
@Tag(name = "Users")
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
@Slf4j(topic = "User Rest Controller")
public class UserRestController {

    private final UserService userService;

    @PostMapping
    @Operation(summary = "Create user")
    @PreAuthorize("hasAnyAuthority(T(com.ktxdev.bugtracker.users.model.UserRole).ADMIN)")
    public ResponseEntity<User> create(
            @RequestBody UserDto userDto,
            HttpServletRequest request
    ) {
        URI uri = ServletUriComponentsBuilder.fromRequestUri(request)
                .build().toUri();

        return ResponseEntity.created(uri)
                .body(userService.create(userDto));
    }

    @PostMapping("sign-up")
    @Operation(summary = "User sign up")
    public ResponseEntity<User> register(
            @RequestBody UserDto userDto,
            HttpServletRequest request
    ) {
        URI uri = ServletUriComponentsBuilder.fromRequestUri(request)
                .build().toUri();

        return ResponseEntity.created(uri)
                .body(userService.register(userDto));
    }

    @PutMapping("{userId}")
    @Operation(summary = "Update user")
    public ResponseEntity<User> update(
            @RequestBody UserUpdateDto userDto,
            @PathVariable long userId
    ) {
        userDto.setId(userId);
        return ResponseEntity.ok(userService.update(userDto));
    }

    @PutMapping("change-password")
    @Operation(summary = "Change user password")
    public ResponseEntity<User> updatePassword(
            @RequestBody UserPasswordUpdateDto updateDto,
            Principal principal
    ) {
        updateDto.setPrincipal(principal);
        return ResponseEntity.ok(userService.updatePassword(updateDto));
    }

    @GetMapping("my-profile")
    @Operation(summary = "Get logged in user profile")
    public ResponseEntity<User> profile(
            Principal principal
    ) {
        return ResponseEntity.ok(userService.profile(principal));
    }

    @GetMapping
    @Operation(summary = "Get paged users")
    public ResponseEntity<Page<User>> getPagedUsers(
            @PageableDefault(sort = "lastName") Pageable pageable,
            @RequestParam(required = false) String q
    ) {
        return ResponseEntity.ok(userService.getAllUser(pageable, q));
    }

    @GetMapping("all")
    @Operation(summary = "Get all users")
    public ResponseEntity<Collection<User>> getAllUsers(
            @RequestParam(required = false) String q
    ) {
        return ResponseEntity.ok(userService.findAll(q));
    }

    @DeleteMapping("{userId}")
    @Operation(summary = "Delete user by id")
    public ResponseEntity<?> deleteUser(
            @PathVariable long userId
    ) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
}
