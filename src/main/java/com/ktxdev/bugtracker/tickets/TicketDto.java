package com.ktxdev.bugtracker.tickets;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.ktxdev.bugtracker.projects.Project;
import com.ktxdev.bugtracker.projects.ProjectDeserializer;
import lombok.Data;

@Data
public class TicketDto {
    @JsonIgnore
    private long id;

    private String title;

    private String description;

    private TicketType type;

    private TicketPriority priority;

    private TicketStatus status;

    private TimeEstimated timeEstimated;

    @JsonProperty("projectId")
    @JsonDeserialize(using = ProjectDeserializer.class)
    private Project project;
}
