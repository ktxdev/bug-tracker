package com.ktxdev.bugtracker.tickets.utils;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.ktxdev.bugtracker.tickets.model.Ticket;
import com.ktxdev.bugtracker.tickets.service.TicketService;
import lombok.RequiredArgsConstructor;

import java.io.IOException;

import static java.util.Objects.nonNull;

@RequiredArgsConstructor
public class TicketDeserializer extends JsonDeserializer<Ticket> {

    private final TicketService ticketService;

    @Override
    public Ticket deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        Long id = jsonParser.readValueAs(Long.class);
        return nonNull(id) ? ticketService.getTicketById(id) : null;
    }
}
