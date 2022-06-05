package com.ktxdev.bugtracker.users.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class UserUpdateDto {
    @JsonIgnore
    private long id;

    private String firstName;

    private String lastName;
}
