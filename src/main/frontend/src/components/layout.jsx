import { CssBaseline, ThemeProvider, Toolbar } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import { theme } from '../theme/index.js'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../auth/auth'
import { get } from '../api/api-core'

const Layout = () => {

  const { auth,  setProfile } = useAuth();

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const headers = {
      'Authorization': 'Bearer ' + auth.accessToken
    };

    const response = await get('/v1/users/profile', headers);
    if (response.success) {
      setProfile(response.data)
    }
  }

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  }

  return (
    <ThemeProvider theme={theme} >
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar open={open} toggleDrawer={toggleDrawer} />
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="2xl" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Layout