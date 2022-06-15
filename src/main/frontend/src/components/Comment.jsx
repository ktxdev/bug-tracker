import { Delete } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../auth/auth';

/***
 *     {
        "id": 1,
        "text": "Testing comments",
        "ticket": {}
        "owner": {
            "id": 1,
            "firstName": "Default",
            "lastName": "Admin",
            "email": "admin@ktxdev.com",
            "role": "ADMIN"
        },
        "createdAt": ""
 */
const Comment = ({ comment, onDelete }) => {

    const { auth: { profile } } = useAuth();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' , gap: 2, my: 1 }}>
            <Avatar>
                {`${comment.owner.firstName[0]} ${comment.owner.lastName[0]}`}
            </Avatar>
            <Card sx={{ flexGrow: 1 }} >
                <CardContent>
                    <Typography color="text.secondary">
                        {comment.text}
                    </Typography>
                </CardContent>
            </Card>
            {
                profile.id === comment.owner.id && <IconButton onClick={() => onDelete(comment.id)} >
                    <Delete color='error' />
                </IconButton>
            }
        </Box>
    )
}

export default Comment