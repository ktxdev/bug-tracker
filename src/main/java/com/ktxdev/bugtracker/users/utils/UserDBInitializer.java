package com.ktxdev.bugtracker.users.utils;

import com.ktxdev.bugtracker.users.dao.UserDao;
import com.ktxdev.bugtracker.users.model.User;
import com.ktxdev.bugtracker.users.model.UserRole;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDBInitializer implements InitializingBean {

    @Value("${system.defaults.users.admin.email}")
    private String adminEmail;

    @Value("${system.defaults.users.admin.password}")
    private String adminPassword;

    @Value("${system.defaults.users.user.email}")
    private String userEmail;

    @Value("${system.defaults.users.user.password}")
    private String userPassword;

    private final UserDao userDao;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void afterPropertiesSet() {
        val admin = User.builder()
                .email(adminEmail)
                .password(passwordEncoder.encode(adminPassword))
                .role(UserRole.ADMIN)
                .build();

        if (!userDao.existsByEmail(adminEmail))
            userDao.save(admin);

        val user = User.builder()
                .email(userEmail)
                .password(passwordEncoder.encode(userPassword))
                .role(UserRole.USER)
                .build();

        if (!userDao.existsByEmail(userEmail))
            userDao.save(user);
    }
}
