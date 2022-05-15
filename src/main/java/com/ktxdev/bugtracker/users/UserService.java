package com.ktxdev.bugtracker.users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.security.Principal;

public interface UserService {
    User findUserById(long id);

    User create(UserDto command);

    User register(UserDto command);

    User update(UserDto updateDto);

    User profile(Principal principal);

    Page<User> getAllUser(Pageable pageable, String searchQuery);
}
