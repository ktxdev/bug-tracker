package com.ktxdev.bugtracker.users.utils;

import com.ktxdev.bugtracker.users.dao.UserDao;
import com.ktxdev.bugtracker.users.model.User;
import com.ktxdev.bugtracker.users.model.UserRole;
import com.ktxdev.bugtracker.users.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class UserDBInitializer implements InitializingBean {

    @Value("${system.defaults.email}")
    private String email;

    @Value("${system.defaults.password}")
    private String password;

    private final UserDao userDao;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void afterPropertiesSet() {
        val admin = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(UserRole.ADMIN)
                .build();

        if (!userDao.existsByEmail(email))
            userDao.save(admin);

        val user = User.builder()
                .email("user@ktxdev.com")
                .password(passwordEncoder.encode("Demo123"))
                .role(UserRole.USER)
                .build();

        if (!userDao.existsByEmail("user@ktxdev.com"))
            userDao.save(user);
    }
}
