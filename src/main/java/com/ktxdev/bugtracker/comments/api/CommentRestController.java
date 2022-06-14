package com.ktxdev.bugtracker.comments.api;

import com.ktxdev.bugtracker.comments.dto.CommentDto;
import com.ktxdev.bugtracker.comments.model.Comment;
import com.ktxdev.bugtracker.comments.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.Collection;

@RestController
@RequiredArgsConstructor
@Api(tags = "Comments")
@RequestMapping("api/v1/comments")
public class CommentRestController {

    private final CommentService commentService;

    @PostMapping
    @ApiOperation("Create comment")
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
    @ApiOperation("Update comment")
    public ResponseEntity<Comment> updateProject(
            @RequestBody CommentDto commentDto,
            @PathVariable long commentId
    ) {
        commentDto.setId(commentId);
        return ResponseEntity.ok(commentService.updateComment(commentDto));
    }

    @GetMapping("{commentId}")
    @ApiOperation("Get comment by Id")
    public ResponseEntity<Comment> getCommentById(
            @PathVariable long commentId
    ) {
        return ResponseEntity.ok(commentService.getCommentById(commentId));
    }

    @GetMapping
    @ApiOperation("Get comments by ticket number")
    public ResponseEntity<Collection<Comment>> getCommentsByTicket(
            @RequestParam String ticketNo
    ) {
        return ResponseEntity.ok(commentService.getCommentsByTicket(ticketNo));
    }

    @DeleteMapping("{commentId}")
    @ApiOperation("Delete comment")
    public ResponseEntity<?> deleteComment(
            @PathVariable long commentId
    ) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
