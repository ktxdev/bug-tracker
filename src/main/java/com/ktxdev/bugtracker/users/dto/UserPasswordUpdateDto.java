package com.ktxdev.bugtracker.users.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class UserPasswordUpdateDto {
    @JsonIgnore
    private long id;

    private String password;

    private String confirmPassword;
}
