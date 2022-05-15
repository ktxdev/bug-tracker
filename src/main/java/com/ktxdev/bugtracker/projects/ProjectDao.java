package com.ktxdev.bugtracker.projects;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectDao extends JpaRepository<Project, Long> {
    boolean existsByName(String name);

    boolean existsByNameAndIdIsNot(String name, long id);
}
