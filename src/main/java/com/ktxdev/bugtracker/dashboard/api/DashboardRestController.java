package com.ktxdev.bugtracker.dashboard.api;

import com.ktxdev.bugtracker.dashboard.dto.DashboardStatisticsDto;
import com.ktxdev.bugtracker.dashboard.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Dashboard")
@RequiredArgsConstructor
@RequestMapping("api/v1/dashboard")
public class DashboardRestController {

    private final DashboardService dashboardService;

    @GetMapping
    @Operation(summary = "Get dashboard statistics")
    public ResponseEntity<DashboardStatisticsDto> getStatistics() {
        return ResponseEntity.ok(dashboardService.getStatistics());
    }
}
