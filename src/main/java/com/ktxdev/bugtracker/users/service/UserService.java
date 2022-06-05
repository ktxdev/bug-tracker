package com.ktxdev.bugtracker.users.service;

import com.ktxdev.bugtracker.users.dto.UserDto;
import com.ktxdev.bugtracker.users.dto.UserPasswordUpdateDto;
import com.ktxdev.bugtracker.users.dto.UserUpdateDto;
import com.ktxdev.bugtracker.users.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.security.Principal;

public interface UserService {
    User findUserById(long id);

    User findByEmail(String email);

    User create(UserDto command);

    User register(UserDto command);

    User update(UserUpdateDto updateDto);

    User updatePassword(UserPasswordUpdateDto passwordUpdateDto);

    User profile(Principal principal);

    Page<User> getAllUser(Pageable pageable, String searchQuery);

    void deleteUser(long id);
}
