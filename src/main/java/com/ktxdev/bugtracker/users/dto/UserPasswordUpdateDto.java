package com.ktxdev.bugtracker.users.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.security.Principal;

@Data
public class UserPasswordUpdateDto {
    @JsonIgnore
    private Principal principal;

    private String password;

    private String confirmPassword;
}
