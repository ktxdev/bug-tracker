package com.ktxdev.bugtracker.tickets.service.impl;

import com.ktxdev.bugtracker.exception.InvalidRequestException;
import com.ktxdev.bugtracker.exception.ResourceNotFoundException;
import com.ktxdev.bugtracker.tickets.dao.TicketDao;
import com.ktxdev.bugtracker.tickets.dto.TicketDto;
import com.ktxdev.bugtracker.tickets.model.Ticket;
import com.ktxdev.bugtracker.tickets.service.TicketService;
import com.ktxdev.bugtracker.users.model.User;
import com.ktxdev.bugtracker.users.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.ktxdev.bugtracker.users.model.UserRole.*;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketDao ticketDao;

    private final UserService userService;

    @Override
    public Ticket createTicket(TicketDto ticketDto) {
        val ticket = Ticket.build(ticketDto);
        val assignees = getTicketAssignees(ticketDto.getAssigneeIds());

        val allAreMembersOfProject = ticketDto.getProject().getMembers().containsAll(assignees);

        if (!allAreMembersOfProject)
            throw new InvalidRequestException("Only members of the project can be assigned to the project's ticket");

        ticket.setAssignees(assignees);

        ticketDao.saveAndFlush(ticket);
        ticket.setTicketNo(String.format("%06d", ticket.getId()));

        return ticketDao.save(ticket);
    }

    @Override
    public Ticket updateTicket(TicketDto ticketDto) {
        val ticket = getTicketById(ticketDto.getId());
        val assignees = getTicketAssignees(ticketDto.getAssigneeIds());

        if (!assignees.isEmpty() && !ticketDto.getProject().getMembers().containsAll(assignees)) {
            throw new InvalidRequestException("Only members of the project can be assigned to the project's ticket");
        }

        if (nonNull(ticket.getAssignees()) && !ticket.getAssignees().isEmpty()
                && !assignees.isEmpty()) {
            assignees.retainAll(ticket.getAssignees());
        }

        ticket.update(ticketDto);
        ticket.setAssignees(assignees);
        return ticketDao.save(ticket);
    }

    @Override
    public void deleteTicket(long id) {
        ticketDao.deleteById(id);
    }

    @Override
    public Page<Ticket> getAllTickets(Pageable pageable, Principal principal) {
        val user = userService.findByEmail(principal.getName());

        if (user.getRole().equals(USER))
            return ticketDao.findAllByAssigneesContaining(pageable, user);

        return ticketDao.findAll(pageable);
    }

    @Override
    public Ticket getTicketById(long id) {
        return ticketDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Ticket with id: %d not found", id)));
    }

    private Set<User> getTicketAssignees(List<Long> assigneeIds) {
        return isNull(assigneeIds) ? Set.of() : assigneeIds.stream()
                .map(userService::findUserById)
                .collect(Collectors.toSet());
    }
}
