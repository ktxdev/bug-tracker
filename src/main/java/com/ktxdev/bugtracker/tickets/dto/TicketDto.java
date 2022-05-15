package com.ktxdev.bugtracker.tickets.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.ktxdev.bugtracker.projects.model.Project;
import com.ktxdev.bugtracker.projects.utils.ProjectDeserializer;
import com.ktxdev.bugtracker.tickets.model.TicketPriority;
import com.ktxdev.bugtracker.tickets.model.TicketStatus;
import com.ktxdev.bugtracker.tickets.model.TicketType;
import com.ktxdev.bugtracker.tickets.model.TicketTimeEstimated;
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

    private TicketTimeEstimated timeEstimated;

    @JsonProperty("projectId")
    @JsonDeserialize(using = ProjectDeserializer.class)
    private Project project;
}
