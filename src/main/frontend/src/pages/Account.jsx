import { Avatar, Box, Button, Container, Divider, TextField, Typography } from '@mui/material';
import { width } from '@mui/system';
import { useEffect, useState } from 'react'
import { changePassword, getMyProfile, updateUser } from '../api/users-api';
import { useAuth } from '../auth/auth';
import { useAlert } from '../utils/AlertContext';

const Account = () => {

  useEffect(() => {
    document.title = 'Account | Bug Tracker';
  }, []);

  const { auth } = useAuth();

  const initProfile = {firstName: '', lastName: '', email: ''}
  const [profile, setProfile] = useState(auth.profile || initProfile);

  useEffect(() => {
    fetchMyProfile();
  }, [])

  const fetchMyProfile = async () => {
    const response = await getMyProfile(auth.accessToken);
    if (response.success) {
      const data = response.data;
      setProfile(data);
      setUserDetails({firstName: data.firstName || '', lastName: data.lastName || ''})
    }
  }

  const { setFeedback } = useAlert();

  const { auth: { accessToken } } = useAuth();

  const [hasChanges, setHasChanges] = useState(false)

  const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '' })

  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();
    
    const updatedUser = {...profile, ...userDetails};

    const response = await updateUser(profile.id, updatedUser, accessToken);

    if(response.success) {
      setProfile(response.data)
      setFeedback({
        open: true,
        severity: 'success',
        title: 'Account details updated!'     
      })
    } else {
      setFeedback({
        open: true,
        severity: 'error',
        title: response.data.message || 'Failed to update user details'     
      })
    }
  }

  const handleUserDetailsInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    
    if(value !== profile[name]) {
      setHasChanges(true)
    }
  }

  const initNewPassword = { password: '', confirmPassword: ''}
  const [newPassword, setNewPassword] = useState(initNewPassword)
  
  const handleNewPasswordInputChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
  }

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    if(newPassword.password !== newPassword.confirmPassword) {
      setFeedback({open: true, severity: 'error', title: 'Passwords do not match'})
    }

    const response = await changePassword(newPassword, accessToken);

    if(response.success) {
      setFeedback({
        open: true,
        severity: 'success',
        title: 'Password successfully updated!'     
      })
      setNewPassword(initNewPassword)
    } else {
      setFeedback({
        open: true,
        severity: 'error',
        title: response.data.message || 'Failed to update password!'     
      })
    }
  }

  return (
    <Container sx={{ my: 8, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box fullWidth sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '400px', maxWidth: '600px' }}>
        <Avatar sx={{ height: 80, width: 80 }} />
        <Typography variant='h6' sx={{ mt: 2 }} color='textSecondary'>
          {profile.email}
        </Typography>
        <Divider sx={{ my: 2, width:'100%' }} />

        <form onSubmit={handleUserDetailsSubmit} style={{ width: '100%' }} >
          <TextField
            fullWidth
            label='First Name'
            margin='normal'
            variant='outlined'
            name='firstName'
            value={userDetails.firstName}
            onChange={handleUserDetailsInputChange}
          />
          <TextField
            fullWidth
            label='Last Name'
            margin='normal'
            variant='outlined'
            name='lastName'
            value={userDetails.lastName}
            onChange={handleUserDetailsInputChange}
          />

          <Button
            color='primary'
            size='large'
            disabled={!hasChanges}
            type='submit'
            variant='contained'
            sx={{ mb: 1, textTransform: 'none', float: 'right' }}
          >
            Save Changes
          </Button>
        </form>
        <Divider sx={{ my: 2, width:'100%' }} />
        <Typography 
          color='textSecondary' variant='h6' sx={{ alignSelf: 'flex-start' }} >Change Password</Typography>
        <form onSubmit={handleNewPasswordSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            label='New Password'
            margin='normal'
            type='password'
            variant='outlined'
            name='password'
            value={newPassword.password}
            onChange={handleNewPasswordInputChange}
          />
          <TextField
            fullWidth
            label='Confirm New Password'
            margin='normal'
            variant='outlined'
            type='password'
            name='confirmPassword'
            value={newPassword.confirmPassword}
            onChange={handleNewPasswordInputChange}
          />

          <Button
            color='primary'
            size='large'
            disabled={newPassword.password === '' || newPassword.confirmPassword === ''}
            type='submit'
            variant='contained'
            sx={{ mb: 1, textTransform: 'none', float: 'right' }}
          >
            Change Password
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default Account