import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {

    useEffect(() => {
        document.title = 'Sign Up | Bug Tracker'; 
      }, []);
    

    return (
        <Box sx={{ 
            alignItems: 'center',
            display: 'flex', 
            flexGrow: 1, 
            minHeight: '100vh'}}>
                <Container maxWidth="sm">
                    <form>
                        <Box sx={{ my: 3, textAlign: 'center' }}>
                            <Typography color="textPrimary" variant="h4">
                                Bug Tracker
                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2">
                                Please enter the following details to create an account
                            </Typography>
                        </Box>
                        <TextField
                            // error='Error'
                            // helperText="Text"
                            fullWidth
                            label='First Name'
                            margin='normal'
                            type='text'
                            variant='outlined'
                            name='fname'
                        />
                        <TextField
                            // error='Error'
                            // helperText="Text"
                            fullWidth
                            label='Last Name'
                            margin='normal'
                            type='text'
                            variant='outlined'
                            name='lname'
                        />
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
                        <TextField
                            // error='Error'
                            // helperText="Text"
                            fullWidth
                            label='Confirm Password'
                            margin='normal'
                            type='password'
                            variant='outlined'
                            name='confirmPassword'
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color='primary'
                                // disabled
                                fullWidth
                                size='large'
                                type='submit'
                                variant='contained'
                                sx={{ mb: 1 }}
                            >
                                Sign In
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
                                    sx={{ cursor: 'pointer'}}
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