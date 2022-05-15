package com.ktxdev.bugtracker.tickets;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Embeddable
public class TimeEstimated {
    private long timeEstimated;

    @Enumerated(EnumType.STRING)
    private TimeEstimatedUnit timeEstimatedUnit;
}
