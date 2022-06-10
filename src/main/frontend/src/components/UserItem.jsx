import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

const UserItem = ({onClick, id, firstName, lastName}) => {
  return (
    <Box>
        <Avatar/>
        <Typography>Sean Huvaya</Typography>
    </Box>
  )
}

export default UserItem