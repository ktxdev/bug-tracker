package com.ktxdev.bugtracker.comments.api;

import com.ktxdev.bugtracker.comments.dto.CommentDto;
import com.ktxdev.bugtracker.comments.model.Comment;
import com.ktxdev.bugtracker.comments.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/comments")
public class CommentRestController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(
            @RequestBody CommentDto commentDto,
            HttpServletRequest request
    ) {
        URI uri  = ServletUriComponentsBuilder.fromRequestUri(request)
                .build()
                .toUri();

        return ResponseEntity.created(uri)
                .body(commentService.createComment(commentDto));
    }

    @PutMapping("{commentId}")
    public ResponseEntity<Comment> updateProject(
            @RequestBody CommentDto commentDto,
            @PathVariable long commentId
    ) {
        commentDto.setId(commentId);
        return ResponseEntity.ok(commentService.updateComment(commentDto));
    }

    @GetMapping("{commentId}")
    public ResponseEntity<Comment> getCommentById(
            @PathVariable long commentId
    ) {
        return ResponseEntity.ok(commentService.getCommentById(commentId));
    }

    @GetMapping
    public ResponseEntity<Page<Comment>> getCommentsByTicket(
            @PageableDefault Pageable pageable,
            @RequestParam String ticketNo
    ) {
        return ResponseEntity.ok(commentService.getCommentsByTicket(pageable, ticketNo));
    }

    @DeleteMapping("{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable long commentId
    ) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
