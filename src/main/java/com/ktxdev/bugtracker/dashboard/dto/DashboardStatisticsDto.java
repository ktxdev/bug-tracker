package com.ktxdev.bugtracker.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatisticsDto {
    private List<DashboardStat> statusStats;

    private List<DashboardStat> priorityStats;

    private List<DashboardStat> typeStats;

    private long totalProjects;

    private long totalTickets;
}
