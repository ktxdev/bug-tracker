package com.ktxdev.bugtracker.comments.service;

import com.ktxdev.bugtracker.comments.dto.CommentDto;
import com.ktxdev.bugtracker.comments.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {
    Comment createComment(CommentDto commentDto);

    Comment updateComment(CommentDto commentDto);

    Comment getCommentById(long id);

    Page<Comment> getCommentsByTicket(Pageable pageable, String ticketNo);

    void deleteComment(long id);
}
