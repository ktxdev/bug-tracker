package com.ktxdev.bugtracker.tickets.service;

import com.ktxdev.bugtracker.tickets.dto.TicketDto;
import com.ktxdev.bugtracker.tickets.model.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.security.Principal;

public interface TicketService {
    Ticket createTicket(TicketDto ticketDto);

    Ticket updateTicket(TicketDto ticketDto);

    void deleteTicket(long id);

    Page<Ticket> getAllTickets(Pageable pageable, Principal principal);

    Ticket getTicketById(long id);
}
