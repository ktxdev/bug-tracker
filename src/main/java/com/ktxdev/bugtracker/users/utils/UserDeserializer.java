package com.ktxdev.bugtracker.users.utils;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.ktxdev.bugtracker.users.model.User;
import com.ktxdev.bugtracker.users.service.UserService;
import lombok.RequiredArgsConstructor;

import java.io.IOException;

import static java.util.Objects.nonNull;

@RequiredArgsConstructor
public class UserDeserializer extends JsonDeserializer<User> {

    private final UserService userService;

    @Override
    public User deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        Long id = jsonParser.readValueAs(Long.class);
        return nonNull(id) ? userService.findUserById(id) : null;
    }
}
