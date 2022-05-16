package com.ktxdev.bugtracker.comments.dao;

import com.ktxdev.bugtracker.comments.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentDao extends JpaRepository<Comment, Long> {
}
