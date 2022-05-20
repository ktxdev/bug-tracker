import React from 'react'
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SignIn = () => {

    return (
        <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%'
        }}>
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
                            type='submit'
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
                            type='submit'
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