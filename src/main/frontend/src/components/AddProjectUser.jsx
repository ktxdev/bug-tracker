import { FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'
import UserItem from './UserItem'

const AddProjectUser = ({ modalOpen, toggleModal }) => {
    const [users, setUsers] = useState([1,2,3,4,5])
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
            <Card sx={{ minWidth: 500 }}>
                <CardContent>
                    <Typography color="text.secondary" variant="h6" gutterBottom>
                        Users
                    </Typography>
                    <Divider sx={{
                        my: 1
                    }} />
                    <form>
                        <TextField
                            required
                            id="search"
                            label="Search"
                            name="search"
                            placeholder='Search by name'
                            value={project.name}
                            onChange={handleInputChange}
                            sx={{ width: '100%', mt: 2 }}
                        />
                    </form>
                    { users.map(user => <UserItem key={user}></UserItem>) }
                </CardContent>
            </Card>
        </Modal>
    )
}

export default AddProjectUser