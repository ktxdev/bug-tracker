package com.ktxdev.bugtracker.projects;

import com.ktxdev.bugtracker.exception.InvalidRequestException;
import com.ktxdev.bugtracker.exception.ResourceNotFoundException;
import com.ktxdev.bugtracker.users.UserService;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import static java.util.Objects.nonNull;
import static org.springframework.util.StringUtils.*;

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
        val project = getProjectById(projectDto.getId());

        if (projectDao.existsByNameAndIdIsNot(project.getName(), projectDto.getId()))
            throw new InvalidRequestException("Project with same name already exists");

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
