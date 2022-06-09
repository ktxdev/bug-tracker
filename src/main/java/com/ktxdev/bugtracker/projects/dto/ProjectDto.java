package com.ktxdev.bugtracker.projects.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.List;

@Data
public class ProjectDto {
    @JsonIgnore
    private long id;

    private String name;

    private String description;

    private List<Long> memberIds;
}
