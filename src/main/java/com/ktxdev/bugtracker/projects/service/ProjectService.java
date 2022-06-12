package com.ktxdev.bugtracker.projects.service;

import com.ktxdev.bugtracker.projects.dto.ProjectDto;
import com.ktxdev.bugtracker.projects.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;

public interface ProjectService {
    Project createProject(ProjectDto projectDto);

    Project updateProject(ProjectDto projectDto);

    Project getProjectById(long id);

    Page<Project> getAllProjects(Pageable pageable);

    Collection<Project> getAllProjects();

    void deleteProject(long id);
}
