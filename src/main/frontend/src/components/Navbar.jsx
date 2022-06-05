import { Avatar, Button, IconButton, ListItemButton, ListItemIcon, ListItemText, Popover, styled, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react'
import MuiAppBar from '@mui/material/AppBar'
import { Logout, Menu } from '@mui/icons-material';
import { BrowserRouter, Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const drawerWidth = 240;

const Navbar = ({ open, toggleDrawer }) => {

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'account-popover' : undefined;

  const navigate = useNavigate();

  const navigateToMyAccount = () => {
    navigate('/account', { replace: true })
    handleClose();
  }

  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut(() => {
      navigate('/sign-in', { replace: true })
    })
    handleClose()
  }

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <Menu />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Bug Tracker
        </Typography>
        <IconButton aria-describedby={id} onClick={handleClick} color="inherit">
          <Avatar />
        </IconButton>
        <Popover
          id={id}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          sx={{ padding: 1 }}
        >
          <ListItemButton
            disableRipple
            onClick={navigateToMyAccount}
          >
            <ListItemText primary='My Account' />
          </ListItemButton>
          <ListItemButton
            disableRipple
            onClick={handleSignOut}
          >
            <ListItemText primary='Sign Out' />
          </ListItemButton>
        </Popover>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar