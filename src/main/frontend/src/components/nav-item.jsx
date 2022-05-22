import React from 'react'
import { Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'

const NavItem = ({ href, icon, title, open, ...others }) => {
    return (
        <NavLink to={href}>
            <ListItemButton>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItemButton>
        </NavLink>
        // <ListItem
        //     disableGutters
        //     sx={{
        //         display: 'flex',
        //         mb: 0.5,
        //         py: 0,
        //         px: 2
        //     }}
        //     {...others}
        // >
        //     <NavLink
        //         to={href}
        //         style={({ isActive }) => ({
        //             backgroundColor: isActive && 'rgba(255,255,255, 0.08)',
        //             borderRadius: 1,
        //             color: isActive ? 'secondary.main' : 'neutral.300',
        //             fontWeight: isActive && 'fontWeightBold',
        //             justifyContent: 'flex-start',
        //             px: 3,
        //             textAlign: 'left',
        //             textTransform: 'none',
        //             width: '100%',
        //             '& .MuiButton-startIcon': {
        //                 color: isActive ? 'secondary.main' : 'neutral.400'
        //             },
        //             '&:hover': {
        //                 backgroundColor: 'rgba(255,255,255, 0.08)'
        //             }
        //         })}
        //     >
        //         <Button
        //             component="a"
        //             startIcon={icon}
        //             disableRipple
        //         >
        //             {open && <Box sx={{ flexGrow: 1 }}>
        //                 {title}
        //             </Box>}
        //         </Button>
        //     </NavLink>
        // </ListItem>
    )
}

export default NavItem