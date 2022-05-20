import { AddBox } from '@mui/icons-material';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {

    return (
        <Box sx={{ 
            alignItems: 'center', 
            display: 'flex', 
            flexGrow: 1, 
            minHeight: '100%'}}>
                <Container maxWidth="sm">
                    <form>
                        <Box sx={{ my: 3, textAlign: 'center' }}>
                            <Typography color="textPrimary" variant="h4">
                                Bug Tracker
                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2">
                                Please enter your email and password to sign in
                            </Typography>
                        </Box>
                        <TextField
                            // error='Error'
                            // helperText="Text"
                            fullWidth
                            label='Email Address'
                            margin='normal'
                            type='email'
                            variant='outlined'
                            name='email'
                        />
                        <TextField
                            // error='Error'
                            // helperText="Text"
                            fullWidth
                            label='Password'
                            margin='normal'
                            type='password'
                            variant='outlined'
                            name='password'
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color='primary'
                                // disabled
                                fullWidth
                                size='large'
                                type='submit'
                                variant='contained'
                            >
                                Sign In
                            </Button>
                            <Typography
                                color='textSecondary'
                                variant='body2'
                            >
                                Dom&apos;t have an account?
                                <Link 
                                    to="/sign-up"
                                    variant="subtitle2"
                                    underline="hover"
                                    sx={{ my: 2, cursor: 'pointer'}}
                                >
                                    Sign Up
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Container>
        </Box>
    )
}

export default Login;