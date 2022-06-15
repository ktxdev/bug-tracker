package com.ktxdev.bugtracker.dashboard.api;

import com.ktxdev.bugtracker.dashboard.dto.DashboardStatisticsDto;
import com.ktxdev.bugtracker.dashboard.service.DashboardService;
import com.ktxdev.bugtracker.tickets.dto.TicketDto;
import com.ktxdev.bugtracker.tickets.model.Ticket;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "Dashboard")
@RequiredArgsConstructor
@RequestMapping("api/v1/dashboard")
public class DashboardRestController {

    private final DashboardService dashboardService;

    @GetMapping
    @ApiOperation("Get dashboard statistics")
    public ResponseEntity<DashboardStatisticsDto> getStatistics() {
        return ResponseEntity.ok(dashboardService.getStatistics());
    }
}
