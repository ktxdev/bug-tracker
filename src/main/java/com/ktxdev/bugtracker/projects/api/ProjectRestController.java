package com.ktxdev.bugtracker.projects.api;

import com.ktxdev.bugtracker.projects.dto.ProjectDto;
import com.ktxdev.bugtracker.projects.model.Project;
import com.ktxdev.bugtracker.projects.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.Collection;

@RestController
@RequiredArgsConstructor
@Tag(name = "Projects")
@RequestMapping("api/v1/projects")
public class ProjectRestController {

    private final ProjectService projectService;

    @PostMapping
    @Operation(summary = "Create project")
    @PreAuthorize("hasAnyAuthority(T(com.ktxdev.bugtracker.users.model.UserRole).ADMIN)")
    public ResponseEntity<Project> createProject(
            @RequestBody ProjectDto projectDto,
            HttpServletRequest request
    ) {
        URI uri  = ServletUriComponentsBuilder.fromRequestUri(request)
                .build()
                .toUri();

        return ResponseEntity.created(uri)
                .body(projectService.createProject(projectDto));
    }

    @PutMapping("{projectId}")
    @Operation(summary = "Update project")
    @PreAuthorize("hasAnyAuthority(T(com.ktxdev.bugtracker.users.model.UserRole).ADMIN)")
    public ResponseEntity<Project> updateProject(
            @RequestBody ProjectDto projectDto,
            @PathVariable long projectId
    ) {
        projectDto.setId(projectId);
        return ResponseEntity.ok(projectService.updateProject(projectDto));
    }

    @GetMapping("{projectId}")
    @Operation(summary = "Get project by id")
    public ResponseEntity<Project> getProject(
            @PathVariable long projectId
    ) {
        return ResponseEntity.ok(projectService.getProjectById(projectId));
    }

    @GetMapping
    @Operation(summary = "Get all projects (Paged)")
    public ResponseEntity<Page<Project>> getAllProjectsPaged(
            @PageableDefault Pageable pageable
    ) {
        return ResponseEntity.ok(projectService.getAllProjects(pageable));
    }

    @GetMapping("all")
    @Operation(summary = "Get all projects")
    public ResponseEntity<Collection<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @DeleteMapping("{projectId}")
    @Operation(summary = "Delete project")
    @PreAuthorize("hasAnyAuthority(T(com.ktxdev.bugtracker.users.model.UserRole).ADMIN)")
    public ResponseEntity<?> deleteProject(
            @PathVariable long projectId
    ) {
        projectService.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }
}
