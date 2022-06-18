package com.ktxdev.bugtracker.tickets.api;

import com.ktxdev.bugtracker.tickets.dto.TicketDto;
import com.ktxdev.bugtracker.tickets.model.Ticket;
import com.ktxdev.bugtracker.tickets.service.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Tickets")
@RequiredArgsConstructor
@RequestMapping("api/v1/tickets")
public class TicketRestController {

    private final TicketService ticketService;

    @PostMapping
    @Operation(summary = "Create ticket")
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
    @Operation(summary = "Update ticket")
    public ResponseEntity<Ticket> updateTicket(
            @RequestBody TicketDto ticketDto,
            @PathVariable long ticketId
    ) {
        ticketDto.setId(ticketId);
        return ResponseEntity.ok(ticketService.updateTicket(ticketDto));
    }

    @GetMapping("{ticketId}")
    @Operation(summary = "Get ticket by id")
    public ResponseEntity<Ticket> getTicketById(
            @PathVariable long ticketId
    ) {
        return ResponseEntity.ok(ticketService.getTicketById(ticketId));
    }

    @GetMapping
    @Operation(summary = "Get all tickets")
    public ResponseEntity<Page<Ticket>> getAllTickets(
            @PageableDefault Pageable pageable,
            Principal principal
    ) {
        return ResponseEntity.ok(ticketService.getAllTickets(pageable, principal));
    }

    @DeleteMapping("{ticketId}")
    @Operation(summary = "Delete ticket")
    public ResponseEntity<?> deleteTicket(
            @PathVariable long ticketId
    ) {
        ticketService.deleteTicket(ticketId);
        return ResponseEntity.noContent().build();
    }

}
