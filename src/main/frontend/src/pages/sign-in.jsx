import React, { useState } from 'react'
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';

const SignIn = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    let from = location.state?.from?.pathname || "/";

    const handleSignIn = (event) => {
        event.preventDefault();
        
        auth.signIn(credentials, () => {
            console.log('Signed');
            navigate(from, { replace: true });
        })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    return (
        <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%'
        }}>
            <Container maxWidth="sm">
                <form onSubmit={handleSignIn} >
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
                        value={credentials.email}
                        onChange={handleInputChange}
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
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                    <Box sx={{ py: 2 }}>
                        <Button
                            color='primary'
                            // disabled
                            fullWidth
                            size='large'
                            type='submit'
                            variant='contained'
                            sx={{ mb: 1, textTransform: 'none' }}
                        >
                            Sign In
                        </Button>
                        <Typography
                            color='textSecondary'
                            variant='body2'
                        >
                            Dom&apos;t have an account?{' '}
                            <Link
                                to="/sign-up"
                                variant="subtitle2"
                                color="textPrimary"
                                underline="hover"
                                sx={{ cursor: 'pointer' }}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                    <Typography
                        align='center'
                        color='textSecondary'
                        variant='body1'
                    >
                        or sign in with demo users
                    </Typography>
                    <Box sx={{ py: 2 }}>
                        <Button
                            color='info'
                            // disabled
                            fullWidth
                            size='large'
                            variant='contained'
                            sx={{ mb: 1, textTransform: 'none' }}
                        >
                            Sign In as Demo User
                        </Button>
                        <Button
                            color='error'
                            // disabled
                            fullWidth
                            size='large'
                            variant='contained'
                            sx={{ mb: 1, textTransform: 'none' }}
                        >
                            Sign In as Demo Admin
                        </Button>
                    </Box>
                </form>
            </Container>
        </Box>
    )
}

export default SignIn;