package com.ktxdev.bugtracker.users.dao;

import com.ktxdev.bugtracker.users.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;

public interface UserDao extends JpaRepository<User, Long> {
    Page<User> findAllByEmailIsNotLike(String username, Pageable pageable);
    Collection<User> findAllByEmailIsNotLike(String username);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
