package com.ktxdev.bugtracker.users.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ktxdev.bugtracker.users.model.UserRole;
import lombok.Data;

@Data
public class UserDto {
    @JsonIgnore
    private long id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String confirmPassword;

    private UserRole role;
}
