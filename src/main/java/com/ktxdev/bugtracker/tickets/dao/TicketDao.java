package com.ktxdev.bugtracker.tickets.dao;

import com.ktxdev.bugtracker.tickets.model.Ticket;
import com.ktxdev.bugtracker.users.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketDao extends JpaRepository<Ticket, Long> {
    Page<Ticket> findAllByAssigneesContaining(Pageable pageable, User assignee);
}
