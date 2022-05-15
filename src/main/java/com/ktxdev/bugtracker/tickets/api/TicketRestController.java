package com.ktxdev.bugtracker.tickets.api;

import com.ktxdev.bugtracker.tickets.dto.TicketDto;
import com.ktxdev.bugtracker.tickets.model.Ticket;
import com.ktxdev.bugtracker.tickets.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/tickets")
public class TicketRestController {

    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<Ticket> createTicket(
            @RequestBody TicketDto ticketDto,
            HttpServletRequest request
    ) {
        URI uri  = ServletUriComponentsBuilder.fromRequestUri(request)
                .build()
                .toUri();

        return ResponseEntity.created(uri)
                .body(ticketService.createTicket(ticketDto));
    }

    @PutMapping("{ticketId}")
    public ResponseEntity<Ticket> updateTicket(
            @RequestBody TicketDto ticketDto,
            @PathVariable long ticketId
    ) {
        ticketDto.setId(ticketId);
        return ResponseEntity.ok(ticketService.updateTicket(ticketDto));
    }

    @GetMapping("{ticketId}")
    public ResponseEntity<Ticket> getTicketById(
            @PathVariable long ticketId
    ) {
        return ResponseEntity.ok(ticketService.getTicketById(ticketId));
    }

    @GetMapping
    public ResponseEntity<Page<Ticket>> getAllTickets(
            @PageableDefault Pageable pageable,
            Principal principal
    ) {
        return ResponseEntity.ok(ticketService.getAllTickets(pageable, principal));
    }

    @DeleteMapping("{ticketId}")
    public ResponseEntity<?> deleteTicket(
            @PathVariable long ticketId
    ) {
        ticketService.deleteTicket(ticketId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{ticketId}/assignees/add-assignee")
    public ResponseEntity<Ticket> addAssignee(
            @PathVariable long ticketId,
            @RequestParam long assigneeId
    ) {
        return ResponseEntity.ok(ticketService.addAssignee(ticketId, assigneeId));
    }

    @PutMapping("{ticketId}/assignees/remove-assignee")
    public ResponseEntity<Ticket> removeAssignee(
            @PathVariable long ticketId,
            @RequestParam long assigneeId
    ) {
        return ResponseEntity.ok(ticketService.removeAssignee(ticketId, assigneeId));
    }
}
