package com.ktxdev.bugtracker.tickets.dao;

import com.ktxdev.bugtracker.dashboard.dto.DashboardStat;
import com.ktxdev.bugtracker.tickets.model.Ticket;
import com.ktxdev.bugtracker.tickets.model.TicketPriority;
import com.ktxdev.bugtracker.tickets.model.TicketStatus;
import com.ktxdev.bugtracker.tickets.model.TicketType;
import com.ktxdev.bugtracker.users.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TicketDao extends JpaRepository<Ticket, Long> {
    @Query(value = "SELECT t.type AS name, COUNT(t) AS totalCount " +
            "FROM Ticket t " +
            "WHERE t.type = :type " +
            "GROUP BY t.type")
    DashboardStat countAllByType(@Param("type") TicketType type);
    @Query(value = "SELECT t.type AS name, COUNT(t) AS totalCount " +
            "FROM Ticket t " +
            "WHERE t.type = :type AND :email IN (SELECT u.email FROM User u WHERE u MEMBER t.assignees) " +
            "GROUP BY t.type")
    DashboardStat countAllByTypeAndAssigneesContains(@Param("type") TicketType type, @Param("email") String email);
    @Query(value = "SELECT t.status AS name, COUNT(t) AS totalCount " +
            "FROM Ticket t " +
            "WHERE t.status = :status " +
            "GROUP BY t.status")
    DashboardStat countAllByStatus(@Param("status") TicketStatus status);
    @Query(value = "SELECT t.status AS name, COUNT(t) AS totalCount " +
            "FROM Ticket t " +
            "WHERE t.status = :status AND :email IN (SELECT u.email FROM User u WHERE u MEMBER t.assignees) " +
            "GROUP BY t.status")
    DashboardStat countAllByStatusAndAssigneesContains(@Param("status") TicketStatus status, @Param("email") String email);
    @Query(value = "SELECT t.priority AS name, COUNT(t) AS totalCount " +
            "FROM Ticket t " +
            "WHERE t.priority = :priority " +
            "GROUP BY t.priority")
    DashboardStat countAllByPriority(@Param("priority") TicketPriority priority);
    @Query(value = "SELECT t.priority AS name, COUNT(t) AS totalCount " +
            "FROM Ticket t " +
            "WHERE t.priority = :priority AND :email IN (SELECT u.email FROM User u WHERE u MEMBER t.assignees) " +
            "GROUP BY t.priority")
    DashboardStat countAllByPriorityAndAssigneesContains(@Param("priority") TicketPriority priority, @Param("email") String email);
    Page<Ticket> findAllByAssigneesContaining(Pageable pageable, User assignee);
    long countAllByAssigneesContains(User user);
}
