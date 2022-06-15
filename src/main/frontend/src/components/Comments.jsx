import { Send } from '@mui/icons-material'
import { Box, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { createComment, deleteComment, getAllComments } from '../api/comments-api';
import { useAuth } from '../auth/auth';
import { useAlert } from '../utils/AlertContext';
import Comment from './Comment';

const Comments = ({ ticket }) => {

    const [comments, setComments] = useState([]);

    const [commentText, setCommentText] = useState('');

    const { auth: { accessToken, profile } } = useAuth();

    const { setFeedback } = useAlert();

    useEffect(() => {
        fetchComments();
    }, [ticket])

    const fetchComments = async () => {
        
        if(!ticket.ticketNo) return;

        const response = await getAllComments(ticket.ticketNo, accessToken);
        
        if(response.success) {
            setComments(response.data);
        } else {
            setFeedback({
                open: true,
                severity: 'error',
                title: 'Failed to get comments. Please refresh page.'
            })
        }
    }

    const onDelete = async (id) => {
        const response = await deleteComment(id, accessToken);
        if(response.success) {
            setComments(response.data);
            const updatedComments = comments.filter(comment => comment.id !== id);
            setComments(updatedComments);
            setFeedback({
                open: true,
                severity: 'success',
                title: 'Comment successfully deleted!'
            })
        } else {
            setFeedback({
                open: true,
                severity: 'error',
                title: response.data.message
            })
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (commentText === '') {
            setFeedback({
                open: true,
                severity: 'error',
                title: 'Connot post comment with no text'
            })
            return;
        }

        const comment = {
            text: commentText,
            ticketId: ticket.id,
            userId: profile.id
        };

        const response = await createComment(comment, accessToken);
        if (response.success) {
            setCommentText('');
            comments.unshift(response.data);
        } else {
            setFeedback({
                open: true,
                severity: 'error',
                title: response?.data?.message && 'Oops!! something went wrong'
            })
        }

    }

    return (
        <Box>
            <Typography color='textSecondary' sx={{ my: 1 }}>Comments ({comments.length}) </Typography>
            <Divider sx={{ my: 1 }} />
            <form onSubmit={handleFormSubmit}>
                <FormControl sx={{ my: 1, width: '100%' }} variant="outlined" >
                    <InputLabel htmlFor="comment">Comment</InputLabel>
                    <OutlinedInput
                        id="comment"
                        placeholder='Enter comment'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="add comment"
                                    edge="end"
                                >
                                    <Send />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                </FormControl>
            </form>
            {
                comments.map(comment => <Comment key={comment.id} comment={comment} onDelete={onDelete}/>)
            }
        </Box>
    )
}

export default Comments