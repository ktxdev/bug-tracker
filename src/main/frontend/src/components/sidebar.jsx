import React from 'react'
import NavItem from "./nav-item";
import MuiDrawer from '@mui/material/Drawer';
import { AccountCircle, Assignment, BarChart, ChevronLeft, ConfirmationNumber, Group } from "@mui/icons-material";
import { Divider, IconButton, List, styled, Toolbar } from '@mui/material';

const items = [
    {
        href: '/',
        icon: (<BarChart fontSize="small" />),
        title: 'Dashboard'
    },
    {
        href: '/tickets',
        icon: (<ConfirmationNumber fontSize="small" />),
        title: 'Tickets'
    },
    {
        href: '/projects',
        icon: (<Assignment fontSize="small" />),
        title: 'Projects'
    },
    {
        href: '/users',
        icon: (<Group fontSize="small" />),
        title: 'Users'
    },
    {
        href: '/account',
        icon: (<AccountCircle fontSize="small" />),
        title: 'Account'
    },
];

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
            height: '100vh'
        },
    }),
);

const Sidebar = ({ open, toggleDrawer }) => {
    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1]
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeft />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {items.map(item=> <NavItem {...item} open={open} />)}
            </List>
        </Drawer>
    )
}

export default Sidebar