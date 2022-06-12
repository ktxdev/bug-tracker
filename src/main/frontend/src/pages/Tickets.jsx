import { Box, Button, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { createTicket, getAllTicketsPaged } from '../api/tickets-api';
import { useAuth } from '../auth/auth';
import TicketDetails from '../components/TicketDetails';
import { useAlert } from '../utils/AlertContext';
import { useSpinner } from '../utils/SpinnerContext';

const Tickets = () => {

  useEffect(() => {
    document.title = 'Tickets | Bug Tracker';
  }, []);

  const { loading, showLoader, hideLoader } = useSpinner();


  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      showLoader();
      await fetchTickets(page, rowsPerPage);
      hideLoader();
    }

    fetch();
  }, [])

  const fetchTickets = async (page, size) => {
    const response = await getAllTicketsPaged(page, size, accessToken);

    console.log(response);
    if (response.success) {
      const data = response.data;
      setTotalCount(data.totalElements)
      setPage(data.number)
      setRowsPerPage(data.size)
      // setProjects(data.content);
    } else {
      setFeedback({
        open: true,
        severity: 'error',
        title: 'Failed to load projects. Please refresh page.'
      })
    }
  }

  const initTicket = {
    title: '',
    projectId: 0,
    description: '',
    timeEstimated: {
      timeEstimated: 0,
      timeEstimatedUnit: 'MINUTES'
    },
    type: 'BUG',
    status: 'OPEN',
    priority: 'LOW'
  }
  const [ticket, setTicket] = useState(initTicket)

  const [showTicketDetailsModal, setShowTicketDetailsModal] = useState(false);
  const toggleTicketModal = () => setShowTicketDetailsModal(!showTicketDetailsModal);

  const { setFeedback } = useAlert();
  const { auth: { accessToken } } = useAuth();

  const onSave = async () => {
    console.log(ticket);
    onCreateTicket();
  }

  const onCreateTicket = async () => {
    const response = createTicket(ticket, accessToken)

    console.log(response);
    if (response.success) {
      setFeedback({
        open: true,
        severity: 'success',
        title: 'Ticket successfully created!'
      })

      // setProjects([...projects, res.data])
      setTicket(initTicket)
      toggleTicketModal();
    } else {
      setFeedback({ open: true, severity: 'error', title: response.data.message })
    }
  }

  return (
    <>
      {!loading && <Box sx={{ mx: 4, my: 2 }}>
        <Typography
          color='textSecondary'
          variant='h5'
        >
          Tickets
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ py: 1, display: 'flex', justifyContent: 'flex-end' }} >
          <Button
            color='primary'
            size='small'
            variant='contained'
            sx={{ mb: 1, textTransform: 'none' }}
            onClick={toggleTicketModal}
          >
            New Ticket
          </Button>
        </Box>

        <TicketDetails
          ticketModalOpen={showTicketDetailsModal}
          toggleTicketModal={toggleTicketModal}
          ticket={ticket}
          setTicket={setTicket}
          onSave={onSave}
        />

      </Box>
      }
    </>
  )
}

export default Tickets