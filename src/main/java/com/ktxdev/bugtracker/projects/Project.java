package com.ktxdev.bugtracker.projects;

import com.ktxdev.bugtracker.users.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany
    private List<User> members;

    public void addMember(User user) {
        if (isNull(this.members))
            this.members = new ArrayList<>();

        this.members.add(user);
    }

    public void removeMember(User user) {
        this.members.remove(user);
    }
}
