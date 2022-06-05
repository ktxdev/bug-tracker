import { Button, Card, CardContent, Divider, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useAlert } from '../utils/AlertContext';

const UserDetails = ({ modalOpen, toggleModal, user, setUser, onSave }) => {

    const { setFeedback } = useAlert();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(user.password !== user.confirmPassword) {
            setFeedback({ open: true, severity: 'error', title: 'Passwords do not match' });
            return;
        }

        onSave();
    }

    return (
        <Modal
            open={modalOpen}
            onClose={toggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Card sx={{ maxWidth: 700 }}>
                <CardContent>
                    <Typography color="text.secondary" variant="h6" gutterBottom>
                        User Details
                    </Typography>
                    <Divider sx={{
                        my: 1
                    }} />
                    <form onSubmit={handleSubmit} >
                        <TextField
                            required
                            label="First Name"
                            name="firstName"
                            size='small'
                            value={user.firstName}
                            onChange={handleInputChange}
                            sx={{ width: '100%', mt: 2 }}
                        />

                        <TextField
                            required
                            label="Last Name"
                            name="lastName"
                            size='small'
                            value={user.lastName}
                            onChange={handleInputChange}
                            sx={{ width: '100%', mt: 2 }}
                        />

                        <TextField
                            required
                            label="Email"
                            name="email"
                            size='small'
                            type='email'
                            value={user.email}
                            onChange={handleInputChange}
                            sx={{ width: '100%', mt: 2 }}
                        />

                        <TextField
                            required
                            label="Password"
                            name="password"
                            size='small'
                            type='password'
                            value={user.password}
                            onChange={handleInputChange}
                            sx={{ width: '100%', mt: 2 }}
                        />


                        <TextField
                            required
                            label="Confirm Password"
                            name="confirmPassword"
                            size='small'
                            type='password'
                            value={user.confirmPassword}
                            onChange={handleInputChange}
                            sx={{ width: '100%', mt: 2 }}
                        />

                        <FormControl fullWidth  sx={{ mt: 2}}>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role-select"
                                label="Role"
                                size='small'
                                name='role'
                                value={user.role}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="ADMIN">ADMIN</MenuItem>
                                <MenuItem value="USER">USER</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                onClick={toggleModal}
                                size='large'
                                variant='outlined'
                                sx={{ px: 4, textTransform: 'none' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                color='primary'
                                size='large'
                                type='submit'
                                variant='contained'
                                sx={{ px: 4, textTransform: 'none' }}
                            >
                                Save
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Modal>
    )
}

export default UserDetails