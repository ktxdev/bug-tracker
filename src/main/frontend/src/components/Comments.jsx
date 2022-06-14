import { Send } from '@mui/icons-material'
import { Box, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import React, { useState } from 'react'
import { createComment } from '../api/comments-api';
import { useAuth } from '../auth/auth';
import { useAlert } from '../utils/AlertContext';

const Comments = ({ ticket }) => {

    const [comments, setComments] = useState([]);

    const [commentText, setCommentText] = useState('');

    const { auth: { accessToken, profile } } = useAuth();

    const { setFeedback } = useAlert();

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
        </Box>
    )
}

export default Comments