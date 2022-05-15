package com.ktxdev.bugtracker.tickets.model;

import com.ktxdev.bugtracker.projects.model.Project;
import com.ktxdev.bugtracker.tickets.dto.TicketDto;
import com.ktxdev.bugtracker.users.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;

import static java.util.Objects.isNull;
import static javax.persistence.GenerationType.IDENTITY;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String ticketNo;

    @Column(nullable = false)
    private String title;

    private String description;

    @Embedded
    private TicketTimeEstimated timeEstimated;

    @Enumerated(EnumType.STRING)
    private TicketType type;

    @Enumerated(EnumType.STRING)
    private TicketPriority priority;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @ManyToOne
    private Project project;

    @OneToMany
    private Set<User> assignees;

    public static Ticket build(TicketDto ticketDto) {
        return Ticket.builder()
                .ticketNo(String.valueOf(System.nanoTime()))
                .title(ticketDto.getTitle())
                .description(ticketDto.getDescription())
                .type(ticketDto.getType())
                .priority(ticketDto.getPriority())
                .status(ticketDto.getStatus())
                .timeEstimated(ticketDto.getTimeEstimated())
                .project(ticketDto.getProject())
                .build();
    }

    public void removeAssignee(User user) {
        if (isNull(this.assignees)) return;
        this.assignees.remove(user);
    }

    public void addAssignee(User user) {
        if (isNull(this.assignees))
            this.assignees = new HashSet<>();

        this.assignees.add(user);
    }

    public void update(TicketDto ticketDto) {
        this.setTitle(ticketDto.getTitle());
        this.setDescription(ticketDto.getDescription());
        this.setType(ticketDto.getType());
        this.setPriority(ticketDto.getPriority());
        this.setStatus(ticketDto.getStatus());
        this.setTimeEstimated(ticketDto.getTimeEstimated());
        this.setProject(ticketDto.getProject());
    }
}
