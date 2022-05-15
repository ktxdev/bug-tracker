package com.ktxdev.bugtracker.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
