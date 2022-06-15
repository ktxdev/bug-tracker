import { Delete, NoteAlt, Visibility } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createTicket, deleteTicket, getAllTicketsPaged, updateTicket } from '../api/tickets-api';
import { useAuth } from '../auth/auth';
import NoContent from '../components/NoContent';
import PaginatedTable from '../components/PaginatedTable';
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

  const [tickets, setTickets] = useState([])

  const fetchTickets = async (page, size) => {
    const response = await getAllTicketsPaged(page, size, accessToken);

    if (response.success) {
      const data = response.data;
      setTotalCount(data.totalElements)
      setPage(data.number)
      setRowsPerPage(data.size)
      setTickets(data.content);
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
    if(isEdit) {
      onUpdateTicket();
    } else {
      onCreateTicket();
    }
  }

  const onCreateTicket = async () => {
    const response = await createTicket(ticket, accessToken)

    if (response.success) {
      setFeedback({
        open: true,
        severity: 'success',
        title: 'Ticket successfully created!'
      })

      fetchTickets(page, rowsPerPage)
      setTicket(initTicket)
      toggleTicketModal();
    } else {
      setFeedback({ open: true, severity: 'error', title: response.data.message })
    }
  }

  const onUpdateTicket = async() => {
    const response = await updateTicket(ticket.id, ticket, accessToken)

    if (response.success) {
      setFeedback({
        open: true,
        severity: 'success',
        title: 'Ticket successfully updated!'
      })
      
      const id = response.data.id;
      const updatedTickets = tickets.map(ticket => {
        if(id === ticket.id) return response.data;
        return ticket;
      })

      setTickets(updatedTickets)
      setTicket(initTicket)
      toggleTicketModal();
      setIsEdit(false)
    } else {
      setFeedback({ open: true, severity: 'error', title: response.data.message })
    }
  }

  const [isEdit, setIsEdit] = useState(false)

  const onEdit = (id) => {
    const ticketToEdit = tickets.filter(ticket => ticket.id === id)[0];
    setTicket({...ticketToEdit, projectId: ticketToEdit.project.id});
    setIsEdit(true);
    toggleTicketModal();
  }

  const onDelete = async(id) => {
    const response = await deleteTicket(id, accessToken);
    if(response.success) {
      setFeedback({
        open: true,
        severity: 'success',
        title: 'Ticket successfully deleted!'
      })

      fetchTickets(page, rowsPerPage);
    } else {
      setFeedback({ open: true, severity: 'error', title: response.data.message })
    }
  }

  const navigate = useNavigate();

  const onView = (id) => {
    navigate(`${id}`, { replace: true })
  }

  const COLUMNS = [
    { id: 'title', label: 'Title', minWidth: 80, align: 'left' },
    { id: 'priority', label: 'Priority', minWidth: 80, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 80, align: 'left' },
    { id: 'type', label: 'Type', minWidth: 80, align: 'left' },
    { id: 'assignees', label: 'Assignees',  minWidth: 170, align: 'left' },
    {
      id: 'actions', label: '', align: 'left', actions: [
        { id: 'view-ticket', icon: <Visibility />, color: 'info', onClick: onView },
        { id: 'edit-ticket', icon: <NoteAlt />, color: 'primary', onClick: onEdit },
        { id: 'delete-ticket', icon: <Delete />, color: 'error', onClick: onDelete }
      ]
    },
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchTickets(newPage, rowsPerPage);
  }

  const handleRowsPerPageChange = (event) => {
    const size = event.target.value;
    setRowsPerPage(size);
    setPage(0);
    fetchTickets(0, size);
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

        {tickets.length === 0 ? <NoContent message="There are no tickets. You can add one by clicking the 'New Ticket' button." />
          : <PaginatedTable columns={COLUMNS} data={tickets} count={totalCount}
            page={page} rowsPerPage={rowsPerPage}
            handlePageChange={handlePageChange} handleRowsPerPageChange={handleRowsPerPageChange} />
        }

      </Box>
      }
    </>
  )
}

export default Tickets