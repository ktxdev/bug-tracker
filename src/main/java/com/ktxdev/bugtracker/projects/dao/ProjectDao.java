package com.ktxdev.bugtracker.projects.dao;

import com.ktxdev.bugtracker.projects.model.Project;
import com.ktxdev.bugtracker.users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectDao extends JpaRepository<Project, Long> {
    boolean existsByName(String name);

    boolean existsByNameAndIdIsNot(String name, long id);
    long countAllByMembersContains(User user);
}
