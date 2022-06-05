import { Delete, NoteAlt } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { createUser, deleteUser, getAllUsers, updateUser } from '../api/users-api';
import { useAuth } from '../auth/auth';
import NoContent from '../components/NoContent';
import PaginatedTable from '../components/PaginatedTable';
import UserDetails from '../components/UserDetails';
import { useAlert } from '../utils/AlertContext';
import { useSpinner } from '../utils/SpinnerContext';

const Users = () => {

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const { loading, showLoader, hideLoader } = useSpinner();

  useEffect(() => {
    document.title = 'Users | Bug Tracker';
  }, []);

  const { auth: { accessToken } } = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    showLoader();
    const fetch = async () => {
      await fetchUsers(page, rowsPerPage);
      hideLoader();
    }
    
    fetch();
  }, [])

  const fetchUsers = async (newPage, size) => {

    const response = await getAllUsers(newPage, size, accessToken);
    if (response.success) {
      const data = response.data;

      setTotalCount(data.totalElements)
      setPage(data.number)
      setRowsPerPage(data.size)
      setUsers(data.content);
    } else {
      setFeedback({ open: true, severity: 'error', title: 'Failed to retrieve users' });
    }
  }

  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => setModalOpen(!modalOpen)

  const initUser = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', role: 'ADMIN' }
  const [user, setUser] = useState(initUser)

  const [isEdit, setIsEdit] = useState(false);

  const { setFeedback } = useAlert();

  const onEdit = async (id) => {
    const userToEdit = users.filter(user => user.id === id)[0];
    setUser(userToEdit);
    setIsEdit(true);
    toggleModal();
  }

  const onDelete = async (id) => {
    const response = await deleteUser(id, accessToken);
    const data = response.data;
    if (response.success) {
      const updatedUsers = users.filter(u => u.id !== id);
      setUsers(updatedUsers);
      setFeedback({ open: true, severity: 'success', title: 'User successfully deleted!' });
    } else {
      setFeedback({ open: true, severity: 'error', title: data.message });
    }
  }

  const saveUser = async () => {
    const response = isEdit ? await updateUser(user.id, user, accessToken) : await createUser(user, accessToken);
    const data = response.data;

    if (response.success) {
      const updatedUsers = isEdit ? users.map(u => {
        if (u.id === user.id) return data;
        return u;
      }) : [...users, data];

      setUsers(updatedUsers);

      setFeedback({
        open: true,
        severity: 'success',
        title: `User successfully ${isEdit ? 'updated' : 'created'}!`
      });

      toggleModal();
      setIsEdit(false);
      setUser(initUser);
    } else {
      setFeedback({ open: true, severity: 'error', title: data.message });
    }
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchUsers(newPage, rowsPerPage);
  }

  const handleRowsPerPageChange = (event) => {
    const size = event.target.value;
    setRowsPerPage(size);
    setPage(0);
    fetchUsers(0, size);
  }


  const COLUMNS = [
    { id: 'firstName', label: 'First Name', minWidth: 170, align: 'left' },
    { id: 'lastName', label: 'Last Name', minWidth: 100, align: 'left' },
    { id: 'email', label: 'Email', minWidth: 170, align: 'left' },
    { id: 'actions', label: '', minWidth: 170, align: 'left', actions: [
      { id: 'edit-user', icon: <NoteAlt/>, color: 'primary', onClick: onEdit },
      { id: 'delete-user', icon: <Delete />, color: 'error', onClick: onDelete }
    ] },
  ];

  return (
    <>
      {!loading && <Box sx={{ mx: 4, my: 2 }}>
        <Typography
          color='textSecondary'
          variant='h5'
        >
          Users
        </Typography>

        <Divider sx={{
          my: 1
        }} />

        <UserDetails modalOpen={modalOpen} toggleModal={toggleModal} user={user} setUser={setUser} onSave={saveUser} />

        <Box sx={{ py: 1, display: 'flex', justifyContent: 'flex-end' }} >
          <Button
            color='primary'
            size='small'
            variant='contained'
            onClick={toggleModal}
            sx={{ mb: 1, textTransform: 'none' }}
          >
            New User
          </Button>
        </Box>

        {
          users.length === 0 ? <NoContent message="There are no users. You can add one by clicking the 'New User' button." />
            : <PaginatedTable columns={COLUMNS} data={users} count={totalCount} 
              page={page} rowsPerPage={rowsPerPage} 
              handlePageChange={handlePageChange} handleRowsPerPageChange={handleRowsPerPageChange} />
        }
      </Box>}
    </>
  )
}

export default Users