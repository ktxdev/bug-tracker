package com.ktxdev.bugtracker.tickets.api;

import com.ktxdev.bugtracker.tickets.dto.TicketDto;
import com.ktxdev.bugtracker.tickets.model.Ticket;
import com.ktxdev.bugtracker.tickets.service.TicketService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
@Api(tags = "Tickets")
@RequiredArgsConstructor
@RequestMapping("api/v1/tickets")
public class TicketRestController {

    private final TicketService ticketService;

    @PostMapping
    @ApiOperation("Create ticket")
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
    @ApiOperation("Update ticket")
    public ResponseEntity<Ticket> updateTicket(
            @RequestBody TicketDto ticketDto,
            @PathVariable long ticketId
    ) {
        ticketDto.setId(ticketId);
        return ResponseEntity.ok(ticketService.updateTicket(ticketDto));
    }

    @GetMapping("{ticketId}")
    @ApiOperation("Get ticket by id")
    public ResponseEntity<Ticket> getTicketById(
            @PathVariable long ticketId
    ) {
        return ResponseEntity.ok(ticketService.getTicketById(ticketId));
    }

    @GetMapping
    @ApiOperation("Get all tickets")
    public ResponseEntity<Page<Ticket>> getAllTickets(
            @PageableDefault Pageable pageable,
            Principal principal
    ) {
        return ResponseEntity.ok(ticketService.getAllTickets(pageable, principal));
    }

    @DeleteMapping("{ticketId}")
    @ApiOperation("Delete ticket")
    public ResponseEntity<?> deleteTicket(
            @PathVariable long ticketId
    ) {
        ticketService.deleteTicket(ticketId);
        return ResponseEntity.noContent().build();
    }

}
