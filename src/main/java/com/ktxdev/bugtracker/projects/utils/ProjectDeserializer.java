package com.ktxdev.bugtracker.projects.utils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.ktxdev.bugtracker.projects.model.Project;
import com.ktxdev.bugtracker.projects.service.ProjectService;
import lombok.RequiredArgsConstructor;

import java.io.IOException;

import static java.util.Objects.nonNull;

@RequiredArgsConstructor
public class ProjectDeserializer extends JsonDeserializer<Project> {

    private final ProjectService projectService;

    @Override
    public Project deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        Long id = jsonParser.readValueAs(Long.class);
        return nonNull(id) ? projectService.getProjectById(id) : null;
    }
}
