import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const Feedback = ({severity, title, open, handleClose}) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {title}
            </Alert>
        </Snackbar>
    )
}

export default Feedback