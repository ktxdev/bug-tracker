import React from 'react'
import { Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import { bgcolor } from '@mui/system'
import { grey } from '@mui/material/colors'

const NavItem = ({ href, icon, title, open, ...others }) => {
    return (
        <NavLink to={href}
            style={({isActive}) => ({
                textDecoration: 'none',
                color: isActive ? '#1976d2' : 'black'
            })}
        >
            <ListItemButton
                disableRipple
            >
                <ListItemIcon style={{color: 'inherit'}}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItemButton>
        </NavLink>
    )
}

export default NavItem