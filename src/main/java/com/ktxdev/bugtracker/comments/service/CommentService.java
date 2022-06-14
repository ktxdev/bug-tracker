package com.ktxdev.bugtracker.comments.service;

import com.ktxdev.bugtracker.comments.dto.CommentDto;
import com.ktxdev.bugtracker.comments.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;

public interface CommentService {
    Comment createComment(CommentDto commentDto);

    Comment updateComment(CommentDto commentDto);

    Comment getCommentById(long id);

    Collection<Comment> getCommentsByTicket(String ticketNo);

    void deleteComment(long id);
}
