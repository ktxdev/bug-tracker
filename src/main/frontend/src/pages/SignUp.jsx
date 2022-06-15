import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../api/users-api';
import { useAlert } from '../utils/AlertContext';

const SignUp = () => {

    useEffect(() => {
        document.title = 'Sign Up | Bug Tracker';
    }, []);

    const initUser = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
    const [user, setUser] = useState(initUser);

    const [canSignUp, setCanSignUp] = useState(false)
    useEffect(() => {
        const { firstName, lastName, email, password, confirmPassword } = user;
        if (firstName !== '' && lastName !== '' && email !== '' && password !== '' && confirmPassword !== '') {
            setCanSignUp(true);
        } else {
            setCanSignUp(false);
        }
    }, [user])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const { setFeedback } = useAlert();

    const navigate =  useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        const response = await signUp(user);
        if(response.success) {
            setFeedback({
                open: true,
                severity: 'success',
                title: 'User successfully registered!'
            })

            navigate('/sign-in', { replace: true });
        } else {
            setFeedback({
                open: true,
                severity: 'error',
                title: response.data.message
            })
        }

    }

    return (
        <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100vh'
        }}>
            <Container maxWidth="sm">
                <form onSubmit={handleFormSubmit}>
                    <Box sx={{ my: 3, textAlign: 'center' }}>
                        <Typography color="textPrimary" variant="h4">
                            Bug Tracker
                        </Typography>
                        <Typography color="textSecondary" gutterBottom variant="body2">
                            Please enter the following details to create an account
                        </Typography>
                    </Box>
                    <TextField
                        required
                        fullWidth
                        label='First Name'
                        margin='normal'
                        type='text'
                        variant='outlined'
                        name='firstName'
                        value={user.firstName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        fullWidth
                        label='Last Name'
                        margin='normal'
                        type='text'
                        variant='outlined'
                        name='lastName'
                        value={user.lastName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        fullWidth
                        label='Email Address'
                        margin='normal'
                        type='email'
                        variant='outlined'
                        name='email'
                        value={user.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        fullWidth
                        label='Password'
                        margin='normal'
                        type='password'
                        variant='outlined'
                        name='password'
                        value={user.password}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        fullWidth
                        label='Confirm Password'
                        margin='normal'
                        type='password'
                        variant='outlined'
                        name='confirmPassword'
                        value={user.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <Box sx={{ py: 2 }}>
                        <Button
                            color='primary'
                            disabled={!canSignUp}
                            fullWidth
                            size='large'
                            type='submit'
                            variant='contained'
                            sx={{ mb: 1 }}
                        >
                            Sign Up
                        </Button>
                        <Typography
                            color='textSecondary'
                            variant='body2'
                        >
                            Have an account?{' '}
                            <Link
                                to="/sign-in"
                                variant="subtitle2"
                                color="textPrimary"
                                underline="hover"
                                sx={{ cursor: 'pointer' }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Container>
        </Box>
    )
}

export default SignUp;