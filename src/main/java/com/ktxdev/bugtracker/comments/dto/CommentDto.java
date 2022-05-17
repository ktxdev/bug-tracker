package com.ktxdev.bugtracker.comments.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.ktxdev.bugtracker.tickets.model.Ticket;
import com.ktxdev.bugtracker.tickets.utils.TicketDeserializer;
import com.ktxdev.bugtracker.users.model.User;
import com.ktxdev.bugtracker.users.utils.UserDeserializer;
import lombok.Data;

@Data
public class CommentDto {
    @JsonIgnore
    private long id;

    private String text;

    @JsonProperty("ticketId")
    @JsonDeserialize(using = TicketDeserializer.class)
    private Ticket ticket;

    @JsonProperty("userId")
    @JsonDeserialize(using = UserDeserializer.class)
    private User owner;
}
