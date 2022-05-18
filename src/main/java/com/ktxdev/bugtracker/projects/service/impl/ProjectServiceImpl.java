package com.ktxdev.bugtracker.projects.service.impl;

import com.ktxdev.bugtracker.exception.InvalidRequestException;
import com.ktxdev.bugtracker.exception.ResourceNotFoundException;
import com.ktxdev.bugtracker.projects.dao.ProjectDao;
import com.ktxdev.bugtracker.projects.dto.ProjectDto;
import com.ktxdev.bugtracker.projects.model.Project;
import com.ktxdev.bugtracker.projects.service.ProjectService;
import com.ktxdev.bugtracker.users.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectDao projectDao;

    private final UserService userService;

    @Override
    public Project createProject(ProjectDto projectDto) {

        if (projectDao.existsByName(projectDto.getName()))
            throw new InvalidRequestException("Project with same name already exists");

        val project = Project.builder()
                .name(projectDto.getName())
                .description(projectDto.getDescription())
                .build();

        return projectDao.save(project);
    }

    @Override
    public Project updateProject(ProjectDto projectDto) {

        if (projectDao.existsByNameAndIdIsNot(projectDto.getName(), projectDto.getId()))
            throw new InvalidRequestException("Project with same name already exists");

        val project = getProjectById(projectDto.getId());

        project.setName(projectDto.getName());
        project.setDescription(projectDto.getDescription());

        return projectDao.save(project);
    }

    @Override
    public Project getProjectById(long id) {
        return projectDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Project with id: %d not found", id)));
    }

    @Override
    public Page<Project> getAllProjects(Pageable pageable) {
        return projectDao.findAll(pageable);
    }

    @Override
    public Project addMember(long projectId, long userId) {
        val project = getProjectById(projectId);
        val user = userService.findUserById(userId);

        if (project.getMembers().contains(user))
            throw new InvalidRequestException("User is already a member of the project");

        project.addMember(user);
        return projectDao.save(project);
    }

    @Override
    public Project removeMember(long projectId, long userId) {
        val project = getProjectById(projectId);
        val user = userService.findUserById(userId);
        project.removeMember(user);
        return projectDao.save(project);
    }

    @Override
    public void deleteProject(long id) {
        projectDao.deleteById(id);
    }
}
