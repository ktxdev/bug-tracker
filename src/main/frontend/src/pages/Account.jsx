import { Avatar, Box, Button, Container, Divider, TextField, Typography } from '@mui/material';
import { width } from '@mui/system';
import { useEffect, useState } from 'react'
import { getMyProfile } from '../api/users-api';
import { useAuth } from '../auth/auth';

const Account = () => {

  useEffect(() => {
    document.title = 'Account | Bug Tracker';
  }, []);

  const { auth } = useAuth();

  const [profile, setProfile] = useState(auth.profile);

  useEffect(() => {
    fetchMyProfile();
  }, [])

  const fetchMyProfile = async () => {
    const response = await getMyProfile(auth.accessToken);
    if (response.success) {
      setProfile(response.data);
    }
  }

  return (
    <Container sx={{ my: 8 }}>
      <Box fullWidth sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '400px', maxWidth: '600px' }}>
        <Avatar sx={{ height: 80, width: 80 }} />
        <Typography variant='h6' sx={{ mt: 2 }} color='textSecondary'>
          {profile.email}
        </Typography>
        <Divider sx={{ my: 2, width:'100%' }} />

        <form style={{ width: '100%' }} >
          <TextField
            fullWidth
            label='First Name'
            margin='normal'
            variant='outlined'
            name='firstName'
            value={profile.firstName}
          />
          <TextField
            fullWidth
            label='Last Name'
            margin='normal'
            variant='outlined'
            name='lastName'
            value={profile.lastName}
          />

          <Button
            color='primary'
            size='large'
            disabled
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
        <form style={{ width: '100%' }}>
          <TextField
            fullWidth
            label='New Password'
            margin='normal'
            variant='outlined'
            name='password'
          />
          <TextField
            fullWidth
            label='Confirm New Password'
            margin='normal'
            variant='outlined'
            name='confirmPassword'
          />

          <Button
            color='primary'
            size='large'
            disabled
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