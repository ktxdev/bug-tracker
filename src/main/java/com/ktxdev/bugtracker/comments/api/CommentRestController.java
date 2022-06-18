package com.ktxdev.bugtracker.comments.api;

import com.ktxdev.bugtracker.comments.dto.CommentDto;
import com.ktxdev.bugtracker.comments.model.Comment;
import com.ktxdev.bugtracker.comments.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.Collection;

@RestController
@RequiredArgsConstructor
@Tag(name = "Comments")
@RequestMapping("api/v1/comments")
public class CommentRestController {

    private final CommentService commentService;

    @PostMapping
    @Operation(summary = "Create comment")
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
    @Operation(summary = "Update comment")
    public ResponseEntity<Comment> updateProject(
            @RequestBody CommentDto commentDto,
            @PathVariable long commentId
    ) {
        commentDto.setId(commentId);
        return ResponseEntity.ok(commentService.updateComment(commentDto));
    }

    @GetMapping("{commentId}")
    @Operation(summary = "Get comment by Id")
    public ResponseEntity<Comment> getCommentById(
            @PathVariable long commentId
    ) {
        return ResponseEntity.ok(commentService.getCommentById(commentId));
    }

    @GetMapping
    @Operation(summary = "Get comments by ticket number")
    public ResponseEntity<Collection<Comment>> getCommentsByTicket(
            @RequestParam String ticketNo
    ) {
        return ResponseEntity.ok(commentService.getCommentsByTicket(ticketNo));
    }

    @DeleteMapping("{commentId}")
    @Operation(summary = "Delete comment")
    public ResponseEntity<?> deleteComment(
            @PathVariable long commentId
    ) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
