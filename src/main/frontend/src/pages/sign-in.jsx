import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Container, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import { useAlert } from '../utils/AlertContext';
import { authenticateDemoAdmin } from '../api/auth-api';

const SignIn = () => {

    const [canSignIn, setCanSignIn] = useState(false);

    useEffect(() => {
        document.title = 'Sign In | Bug Tracker';
    }, [])


    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        setCanSignIn(credentials.email !== '' && credentials.password !== '')
    }, [credentials])

    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const { setFeedback } = useAlert();

    const handleSignIn = (event) => {
        event.preventDefault();

        const from = location.state?.from?.pathname || "/";

        auth.signIn(credentials, (success, message = null) => {
            if (success) {
                setFeedback({ open: true, severity: 'success', title: 'Sign in successful' })
                navigate(from, { replace: true });
            } else {
                setFeedback({ open: true, severity: 'error', title: message })
            }
        })
    }

    const signInAsDemoUser = (admin = false) => {
        const from = location.state?.from?.pathname || "/";

        const authCallback = (success, message = null) => {
            if (success) {
                setFeedback({ open: true, severity: 'success', title: 'Sign in successful' })
                navigate(from, { replace: true });
            } else {
                setFeedback({ open: true, severity: 'error', title: message })
            }
        }

        if(admin) {
            auth.demoAdminSignIn(authCallback);
        } else {
            auth.demoUserSignIn(authCallback);
        }
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
            minHeight: '100vh'
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
                            disabled={ !canSignIn }
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
                            onClick={() => signInAsDemoUser()}
                            fullWidth
                            size='large'
                            variant='contained'
                            sx={{ mb: 1, textTransform: 'none' }}
                        >
                            Sign In as Demo User
                        </Button>
                        <Button
                            color='error'
                            fullWidth
                            onClick={() => signInAsDemoUser(true)}
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