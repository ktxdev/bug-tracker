package com.ktxdev.bugtracker.tickets;

import com.ktxdev.bugtracker.exception.InvalidRequestException;
import com.ktxdev.bugtracker.exception.ResourceNotFoundException;
import com.ktxdev.bugtracker.users.UserRole;
import com.ktxdev.bugtracker.users.UserService;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;

import static com.ktxdev.bugtracker.users.UserRole.*;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketDao ticketDao;

    private final UserService userService;

    @Override
    public Ticket createTicket(TicketDto ticketDto) {
        val ticket = Ticket.build(ticketDto);
        ticketDao.saveAndFlush(ticket);
        ticket.setTicketNo(String.format("%06d", ticket.getId()));
        return ticketDao.save(ticket);
    }

    @Override
    public Ticket updateTicket(TicketDto ticketDto) {
        val ticket = getTicketById(ticketDto.getId());
        ticket.update(ticketDto);
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

    @Override
    public Ticket addAssignee(long ticketId, long assigneeId) {
        val ticket = getTicketById(ticketId);
        val user = userService.findUserById(assigneeId);

        if (!ticket.getProject().getMembers().contains(user))
            throw new InvalidRequestException("You can only add assignees who are already members of the project");

        ticket.addAssignee(user);
        return ticketDao.save(ticket);
    }

    @Override
    public Ticket removeAssignee(long ticketId, long assigneeId) {
        val ticket = getTicketById(ticketId);
        val user = userService.findUserById(assigneeId);
        ticket.removeAssignee(user);
        return ticketDao.save(ticket);
    }
}
