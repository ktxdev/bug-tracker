import { Delete, NoteAlt, Visibility } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Paper, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { createUser, getAllUsers, updateUser } from '../api/users-api';
import { useAuth } from '../auth/auth';
import NoContent from '../components/no-content';
import UserDetails from '../components/user-details';
import { useAlert } from '../utils/AlertContext';
import { useSpinner } from '../utils/SpinnerContext';

const Users = () => {

  const COLUMNS = [
    { id: 'firstName', label: 'First Name', minWidth: 170, align: 'left' },
    { id: 'lastName', label: 'Last Name', minWidth: 100, align: 'left' },
    { id: 'email', label: 'Email', minWidth: 170, align: 'left' },
    { id: 'actions', label: '', minWidth: 170, align: 'left' },
  ];

  const { loading, showLoader, hideLoader } = useSpinner();

  useEffect(() => {
    document.title = 'Users | Bug Tracker';
  }, []);

  const { auth: { accessToken } } = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    showLoader();
    const fetchUsers = async () => {
      const response = await getAllUsers(accessToken);
      if (response.success) {
        setUsers(response.data.content);
      }
      hideLoader();
    }

    fetchUsers();
  }, [])

  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => setModalOpen(!modalOpen)

  const initUser = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', role: 'ADMIN' }
  const [user, setUser] = useState(initUser)

  const [isEdit, setIsEdit] = useState(false);

  const { setFeedback } = useAlert();

  const saveUser = async () => {
    const response = isEdit ? await updateUser(user.id, user, accessToken) : await createUser(user, accessToken);
    const data = response.data;
    console.log(user);
    if(response.success) {
      const updatedUsers = isEdit ? users.map(u => {
        if(u.id === user.id) return data;
        return u;
      }) : [...users, data];

      setUsers(updatedUsers);

      setFeedback({ 
        open: true, 
        severity: 'success', 
        title: `User successfully ${isEdit ? 'updated': 'created'}!`});
      
        toggleModal();
      setIsEdit(false);
      setUser(initUser);
    } else {
      setFeedback({ open: true, severity: 'error', title: data.message });
    }
  }

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
            : <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer>
                <Table>
                  <TableHead >
                    <TableRow>
                      {COLUMNS.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      users.map(user => {
                        return (
                          <TableRow key={user.id}>
                            {
                              COLUMNS.map(column => {
                                if (column.id === 'actions') {
                                  return (<TableCell key={column.id}>
                                    <IconButton color="primary" size="small" sx={{ mx: 1 }} >
                                      <NoteAlt />
                                    </IconButton>
                                    <IconButton color="error" size="small" >
                                      <Delete />
                                    </IconButton>
                                  </TableCell>)
                                }

                                const value = user[column.id];
                                return (<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                  {value === null ? "---" : value}
                                </TableCell>)
                              })
                            }
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
        }
      </Box>}
    </>
  )
}

export default Users