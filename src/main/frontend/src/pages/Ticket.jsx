import { NoteAlt, Send } from '@mui/icons-material';
import { Box, Button, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTicketById } from '../api/tickets-api';
import { useAuth } from '../auth/auth';
import Comments from '../components/Comments';
import { useAlert } from '../utils/AlertContext';
import { useSpinner } from '../utils/SpinnerContext';

const Ticket = () => {

    const params = useParams();

    const { auth: { accessToken } } = useAuth();

    // const initTicket = {
    //     title: '',
    //     projectId: 0,
    //     description: '',
    //     timeEstimated: {
    //         timeEstimated: 0,
    //         timeEstimatedUnit: 'MINUTES'
    //     },
    //     type: 'BUG',
    //     status: 'OPEN',
    //     priority: 'LOW'
    // }
    const [ticket, setTicket] = useState({})

    useEffect(() => {
        showLoader();
        fetchTicketById();
        hideLoader();
    }, [])


    const { setFeedback } = useAlert();

    const fetchTicketById = async () => {
        const response = await getTicketById(params.ticketId, accessToken);
        if (response.success) {
            setTicket(response.data);
        } else {
            setFeedback({ open: true, severity: 'error', title: response.data.message })
        }
    }

    const { loading, showLoader, hideLoader } = useSpinner();

    return (
        <>
            {
                !loading && <Box sx={{ mx: 4, my: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            color='textSecondary'
                            variant='h5'
                        >
                            {`#${ticket.ticketNo}: ${ticket.title}`}
                        </Typography>
                        <Button
                            color='primary'
                            size='small'
                            variant='contained'
                            sx={{ mb: 1, textTransform: 'none' }}
                        // onClick={toggleTicketModal}
                        >
                            <NoteAlt />
                            Edit Ticket
                        </Button>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Grid container spacing={4}>
                        <Grid item md={5} >
                            <Typography color='textSecondary' variant='h6'>Description: </Typography>
                            <Typography sx={{ my: 2 }} >{ticket.description}</Typography>
                            <Box sx={{ my: 2, display: 'flex', gap: 1 }}>
                                <Typography color='textSecondary' >Project: </Typography>
                                <Typography>{ticket?.project?.name}</Typography>
                            </Box>
                            <Box sx={{ my: 2, display: 'flex', gap: 1 }}>
                                <Typography color='textSecondary' >Estimated Time: </Typography>
                                <Typography>
                                    {`${ticket?.timeEstimated?.timeEstimated} ${ticket?.timeEstimated?.timeEstimatedUnit}`}
                                </Typography>
                            </Box>
                            <Box sx={{ my: 2, display: 'flex', gap: 1 }}>
                                <Typography color='textSecondary' >Status: </Typography>
                                <Typography>{ticket.status}</Typography>
                            </Box>
                            <Box sx={{ my: 2, display: 'flex', gap: 1 }}>
                                <Typography color='textSecondary' >Priority: </Typography>
                                <Typography>{ticket.priority}</Typography>
                            </Box>

                            <Box sx={{ my: 2, display: 'flex', gap: 1 }}>
                                <Typography color='textSecondary' >Type: </Typography>
                                <Typography >{ticket.type}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Comments ticket={ticket} />
                        </Grid>
                    </Grid>
                </Box>
            }
        </>
    )
}

export default Ticket