package com.ktxdev.bugtracker.projects.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class ProjectDto {
    @JsonIgnore
    private long id;

    private String name;

    private String description;
}
