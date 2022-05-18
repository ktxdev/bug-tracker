package com.ktxdev.bugtracker.tickets.model;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@Embeddable
public class TicketTimeEstimated {
    private long timeEstimated;

    @Enumerated(EnumType.STRING)
    private TicketTimeEstimatedUnit timeEstimatedUnit;
}
