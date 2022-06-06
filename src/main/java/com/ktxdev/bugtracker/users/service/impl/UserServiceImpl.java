package com.ktxdev.bugtracker.users.service.impl;

import com.ktxdev.bugtracker.exception.InvalidRequestException;
import com.ktxdev.bugtracker.exception.ResourceNotFoundException;
import com.ktxdev.bugtracker.users.dao.UserDao;
import com.ktxdev.bugtracker.users.dto.UserDto;
import com.ktxdev.bugtracker.users.dto.UserPasswordUpdateDto;
import com.ktxdev.bugtracker.users.dto.UserUpdateDto;
import com.ktxdev.bugtracker.users.model.User;
import com.ktxdev.bugtracker.users.model.UserRole;
import com.ktxdev.bugtracker.users.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

import static com.ktxdev.bugtracker.users.model.UserRole.USER;
import static java.util.Objects.nonNull;
import static org.springframework.util.StringUtils.hasText;
@Slf4j(topic = "Users Service")
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Value("${system.defaults.users.admin.email}")
    private String adminEmail;

    @Value("${system.defaults.users.user.email}")
    private String userEmail;

    private final UserDao userDao;

    private final PasswordEncoder passwordEncoder;

    @Override
    public User create(UserDto command) {
        if (!hasText(command.getRole()))
            throw new InvalidRequestException("Role should be provided");
        val user = validateAndBuild(command);
        return userDao.save(user);
    }

    @Override
    public User register(UserDto command) {
        val user = validateAndBuild(command);
        return userDao.save(user);
    }

    @Override
    public User update(UserUpdateDto updateDto) {
        val user = findUserById(updateDto.getId());

        String email = user.getEmail();
        if (email.equals(adminEmail) || email.equals(userEmail))
            throw new InvalidRequestException("Cannot update default user details");

        user.setFirstName(updateDto.getFirstName());
        user.setLastName(updateDto.getLastName());

        return userDao.save(user);
    }

    @Override
    public User updatePassword(UserPasswordUpdateDto updateDto) {
        val user = findByEmail(updateDto.getPrincipal().getName());

        String email = user.getEmail();
        if (email.equals(adminEmail) || email.equals(userEmail))
            throw new InvalidRequestException("Cannot change default user password");

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

    @Override
    public void deleteUser(long id) {
        val user = findUserById(id);
        String email = user.getEmail();
        if (email.equals(adminEmail) || email.equals(userEmail))
            throw new InvalidRequestException("Cannot delete default user(s)");
        userDao.delete(user);
    }

    private User validateAndBuild(UserDto createDto) {
        if (userDao.existsByEmail(createDto.getEmail())) {
            log.debug("### Email already in use: {}", createDto.getEmail());
            throw new InvalidRequestException("Email already in use");
        }

        if (!createDto.getPassword().equals(createDto.getConfirmPassword())) {
            log.debug("### Passwords do not match: {}", createDto);
            throw new InvalidRequestException("Passwords do not match");
        }

        UserRole role = USER;
        if (hasText(createDto.getRole()))
            role = UserRole.valueOf(createDto.getRole());

        log.debug("### Creating user with role: " + role);
        return User.builder()
                .firstName(createDto.getFirstName())
                .lastName(createDto.getLastName())
                .email(createDto.getEmail())
                .password(passwordEncoder.encode(createDto.getPassword()))
                .role(role)
                .build();
    }
}
