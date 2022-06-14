package com.ktxdev.bugtracker.comments.dao;

import com.ktxdev.bugtracker.comments.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface CommentDao extends JpaRepository<Comment, Long> {
    Collection<Comment> findAllByTicket_TicketNo(String ticketNo);
}
