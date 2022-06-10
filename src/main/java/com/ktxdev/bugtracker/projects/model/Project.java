package com.ktxdev.bugtracker.projects.model;

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
public class Project {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private long id;

    private String name;

    private String description;

    @ManyToMany
    private Set<User> members;
}
