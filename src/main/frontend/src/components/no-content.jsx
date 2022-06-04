import { CloudOff } from "@mui/icons-material";
import { Box, Typography } from "@mui/material"

const NoContent = ({message}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}>
            <CloudOff sx={{ width: '200px', height: 'auto' }} />
            <Typography maxWidth='50rem' sx={{ marginTop: '4rem', textAlign: 'center' }}>
                {message}
            </Typography>
        </Box>
    )
}

export default NoContent