package com.ktxdev.bugtracker.comments.service.impl;

import com.ktxdev.bugtracker.comments.dao.CommentDao;
import com.ktxdev.bugtracker.comments.dto.CommentDto;
import com.ktxdev.bugtracker.comments.model.Comment;
import com.ktxdev.bugtracker.comments.service.CommentService;
import com.ktxdev.bugtracker.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentDao commentDao;

    @Override
    public Comment createComment(CommentDto commentDto) {
        log.debug("### Creating new comment");
        val comment = Comment.build(commentDto);
        return commentDao.save(comment);
    }

    @Override
    public Comment updateComment(CommentDto commentDto) {
        log.debug("### Updating comment with id: " + commentDto.getId());
        val comment = getCommentById(commentDto.getId());
        comment.update(commentDto);
        return commentDao.save(comment);
    }

    @Override
    public Comment getCommentById(long id) {
        log.debug("### Retrieving comment with id: " + id);
        return commentDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment with id: " + id + " not found"));
    }

    @Override
    public Page<Comment> getCommentsByTicket(Pageable pageable, String ticketNo) {
        log.debug("### Retrieving comments for ticket: " + ticketNo);
        return commentDao.findAllByTicket_TicketNo(pageable, ticketNo);
    }

    @Override
    public void deleteComment(long id) {
        val comment = getCommentById(id);
        log.debug("### Deleting comment with id: " + id);
        commentDao.delete(comment);
    }
}
