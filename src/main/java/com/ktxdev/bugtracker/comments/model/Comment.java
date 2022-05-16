package com.ktxdev.bugtracker.comments.model;

import com.ktxdev.bugtracker.tickets.model.Ticket;
import com.ktxdev.bugtracker.users.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.GenerationType.IDENTITY;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private long id;

    @Lob
    private String text;

    @ManyToOne
    private Ticket ticket;

    @ManyToOne
    private User owner;

    private LocalDateTime createdAt;
}
