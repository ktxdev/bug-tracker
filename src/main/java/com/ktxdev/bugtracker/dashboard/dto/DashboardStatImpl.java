package com.ktxdev.bugtracker.dashboard.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class DashboardStatImpl implements DashboardStat {

    private final String name;
    private final long totalCount;

    @Override
    public String getName() {
        return name;
    }

    @Override
    public long getTotalCount() {
        return totalCount;
    }
}
