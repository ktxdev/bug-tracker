package com.ktxdev.bugtracker.projects;

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

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/projects")
public class ProjectRestController {

    private final ProjectService projectService;

    @PostMapping
    @PreAuthorize("hasRole(T(com.ktxdev.bugtracker.users.UserRole).ADMIN)")
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
    @PreAuthorize("hasRole(T(com.ktxdev.bugtracker.users.UserRole).ADMIN)")
    public ResponseEntity<Project> updateProject(
            @RequestBody ProjectDto projectDto,
            @PathVariable long projectId
    ) {
        projectDto.setId(projectId);
        return ResponseEntity.ok(projectService.updateProject(projectDto));
    }

    @PutMapping("{projectId}/members/add-member")
    @PreAuthorize("hasRole(T(com.ktxdev.bugtracker.users.UserRole).ADMIN)")
    public ResponseEntity<Project> addMember(
            @PathVariable long projectId,
            @RequestParam long memberId
    ) {
        return ResponseEntity.ok(projectService.addMember(projectId, memberId));
    }

    @PutMapping("{projectId}/members/remove-member")
    @PreAuthorize("hasRole(T(com.ktxdev.bugtracker.users.UserRole).ADMIN)")
    public ResponseEntity<Project> removeMember(
            @PathVariable long projectId,
            @RequestParam long memberId
    ) {
        return ResponseEntity.ok(projectService.removeMember(projectId, memberId));
    }

    @GetMapping("{projectId}")
    public ResponseEntity<Project> getProject(
            @PathVariable long projectId
    ) {
        return ResponseEntity.ok(projectService.getProjectById(projectId));
    }

    @GetMapping
    public ResponseEntity<Page<Project>> getAllProjects(
            @PageableDefault Pageable pageable
    ) {
        return ResponseEntity.ok(projectService.getAllProjects(pageable));
    }

    @DeleteMapping("{projectId}")
    @PreAuthorize("hasRole(T(com.ktxdev.bugtracker.users.UserRole).ADMIN)")
    public ResponseEntity<?> deleteProject(
            @PathVariable long projectId
    ) {
        projectService.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }
}
