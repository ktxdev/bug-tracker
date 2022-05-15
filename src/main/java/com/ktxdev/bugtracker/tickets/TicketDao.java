package com.ktxdev.bugtracker.tickets;

import com.ktxdev.bugtracker.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Set;

public interface TicketDao extends JpaRepository<Ticket, Long> {
    Page<Ticket> findAllByAssigneesContaining(Pageable pageable, User assignee);
}
