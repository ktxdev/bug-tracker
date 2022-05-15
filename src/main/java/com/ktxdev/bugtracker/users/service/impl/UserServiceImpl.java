package com.ktxdev.bugtracker.users.service.impl;

import com.ktxdev.bugtracker.exception.InvalidRequestException;
import com.ktxdev.bugtracker.exception.ResourceNotFoundException;
import com.ktxdev.bugtracker.users.dao.UserDao;
import com.ktxdev.bugtracker.users.dto.UserDto;
import com.ktxdev.bugtracker.users.model.User;
import com.ktxdev.bugtracker.users.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

import static com.ktxdev.bugtracker.users.model.UserRole.*;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    private final PasswordEncoder passwordEncoder;

    @Override
    public User create(UserDto command) {
        if (isNull(command.getRole()))
            throw new InvalidRequestException("Role should be provided");
        val user = validateAndBuild(command);
        return userDao.save(user);
    }

    @Override
    public User register(UserDto command) {
        command.setRole(USER);
        val user = validateAndBuild(command);
        return userDao.save(user);
    }

    @Override
    public User update(UserDto updateDto) {
        val user = findUserById(updateDto.getId());

        if (nonNull(updateDto.getFirstName()))
            user.setFirstName(updateDto.getFirstName());

        if (nonNull(updateDto.getLastName()))
            user.setLastName(updateDto.getLastName());

        if (nonNull(updateDto.getRole()))
            user.setRole(updateDto.getRole());

        if (nonNull(updateDto.getPassword()) && updateDto.getPassword().equals(updateDto.getConfirmPassword())) {
                user.setPassword(passwordEncoder.encode(updateDto.getPassword()));
        } else {
            throw new InvalidRequestException("Passwords do not match");
        }

        return userDao.save(user);
    }

    @Override
    public User profile(Principal principal) {
        return findByEmail(principal.getName());
    }

    @Override
    public Page<User> getAllUser(Pageable pageable, String searchQuery) {
        return userDao.findAll(pageable);
    }

    private User validateAndBuild(UserDto createDto) {
        if (userDao.existsByEmail(createDto.getEmail()))
            throw new InvalidRequestException("Email already in use");

        if (!createDto.getPassword().equals(createDto.getConfirmPassword()))
            throw new InvalidRequestException("Passwords do not match");

        return User.builder()
                .firstName(createDto.getFirstName())
                .lastName(createDto.getLastName())
                .email(createDto.getEmail())
                .password(passwordEncoder.encode(createDto.getPassword()))
                .role(createDto.getRole())
                .build();
    }

    @Override
    public User findUserById(long id) {
        return userDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("User with id %d not found", id)));
    }

    @Override
    public User findByEmail(String email) {
        return userDao.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("User with email %s not found", email)));
    }
}
