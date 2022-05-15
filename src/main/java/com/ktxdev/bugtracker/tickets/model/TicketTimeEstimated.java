package com.ktxdev.bugtracker.tickets.model;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Embeddable
public class TicketTimeEstimated {
    private long timeEstimated;

    @Enumerated(EnumType.STRING)
    private TicketTimeEstimatedUnit timeEstimatedUnit;
}
