package com.ktxdev.bugtracker.dashboard.service.impl;

import com.ktxdev.bugtracker.dashboard.dto.DashboardStat;
import com.ktxdev.bugtracker.dashboard.dto.DashboardStatImpl;
import com.ktxdev.bugtracker.dashboard.dto.DashboardStatisticsDto;
import com.ktxdev.bugtracker.dashboard.service.DashboardService;
import com.ktxdev.bugtracker.projects.dao.ProjectDao;
import com.ktxdev.bugtracker.projects.dto.ProjectDto;
import com.ktxdev.bugtracker.tickets.dao.TicketDao;
import com.ktxdev.bugtracker.tickets.model.TicketPriority;
import com.ktxdev.bugtracker.tickets.model.TicketStatus;
import com.ktxdev.bugtracker.tickets.model.TicketType;
import com.ktxdev.bugtracker.users.model.User;
import com.ktxdev.bugtracker.users.model.UserRole;
import com.ktxdev.bugtracker.users.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.hibernate.type.EnumType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.stream.Collectors;

import static com.ktxdev.bugtracker.users.model.UserRole.*;
import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final TicketDao ticketDao;
    private final ProjectDao projectDao;
    private final UserService userService;

    @Override
    public DashboardStatisticsDto getStatistics() {
        val username = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        val user = userService.findByEmail(username);

        val statusStats = Arrays.stream(TicketStatus.values())
                .map(status -> convertToDashboardStat(status, user))
                .collect(Collectors.toList());

        val priorityStats = Arrays.stream(TicketPriority.values())
                .map(priority -> convertToDashboardStat(priority, user))
                .collect(Collectors.toList());

        val typeStats = Arrays.stream(TicketType.values())
                .map(type -> convertToDashboardStat(type, user))
                .collect(Collectors.toList());

        val totalProjects = (user.getRole() == ADMIN) ? projectDao.count()
                : projectDao.countAllByMembersContains(user);

        val totalTickets = (user.getRole() == ADMIN) ? ticketDao.count()
                : ticketDao.countAllByAssigneesContains(user);

        return DashboardStatisticsDto.builder()
                .typeStats(typeStats)
                .statusStats(statusStats)
                .priorityStats(priorityStats)
                .totalProjects(totalProjects)
                .totalTickets(totalTickets)
                .build();
    }

    private <E extends Enum<E>> DashboardStat convertToDashboardStat(E e, User user) {
        DashboardStat dashboardStat;

        if (e instanceof TicketType) {
            dashboardStat = (user.getRole() == ADMIN) ? ticketDao.countAllByType((TicketType) e)
                    : ticketDao.countAllByTypeAndAssigneesContains((TicketType) e, user.getEmail());
        } else if (e instanceof  TicketStatus) {
            dashboardStat = (user.getRole() == ADMIN) ? ticketDao.countAllByStatus((TicketStatus) e)
                    : ticketDao.countAllByStatusAndAssigneesContains((TicketStatus) e, user.getEmail());
        } else if (e instanceof TicketPriority) {
            dashboardStat = (user.getRole() == ADMIN) ? ticketDao.countAllByPriority((TicketPriority) e)
                    : ticketDao.countAllByPriorityAndAssigneesContains((TicketPriority) e, user.getEmail());
        } else {
            throw new RuntimeException("Invalid enum type for dashboard stats");
        }

        if (isNull(dashboardStat)) {
            return new DashboardStatImpl(e.name(), 0);
        }
        return dashboardStat;
    }
}
