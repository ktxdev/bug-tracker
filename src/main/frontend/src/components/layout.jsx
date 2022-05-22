import { CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useState } from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import { theme } from '../theme/index.js'
import { Outlet } from 'react-router-dom'

const Layout = () => {
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Layout