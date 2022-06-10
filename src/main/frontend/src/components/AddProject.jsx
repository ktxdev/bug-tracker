import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Divider, Grid, Modal, Select, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { getAllUsers } from '../api/users-api'
import { useAuth } from '../auth/auth'

const AddProject = ({ modalOpen, toggleModal, project, setProject, onSave }) => {

    const [canSave, setCanSave] = useState(false)

    useEffect(() => {
        project.name !== '' ? setCanSave(true) : setCanSave(false)
    }, [project])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSave()
    }

    const [users, setUsers] = useState([])

    const [selectedMembers, setSelectedMembers] = useState([]);

    useEffect(() => {
        const selected = project.members !== undefined && project.members !== null ? project.members.map((member) => member.id): [];
        setSelectedMembers(selected)
    }, [])

    const { auth: { accessToken } } = useAuth();

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async() => {
        const response = await getAllUsers(accessToken);
        if(response.success) {
            const data = response.data.map(d => {
                return { id: d.id, name: `${d.firstName} ${d.lastName}`}
            })
            setUsers(data);
        }
    }

    const COLUMNS = [
        {field: 'name', headerName: 'Name', width: 350 },
    ]

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
            <Card sx={{ width: '50%' }}>
                <CardContent>
                    <Typography color="text.secondary" variant="h6" gutterBottom>
                        Project Details
                    </Typography>
                    <Divider sx={{
                        my: 1
                    }} />
                    <form onSubmit={handleFormSubmit} >
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6} >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Name"
                                    name="name"
                                    value={project.name}
                                    onChange={handleInputChange}
                                    sx={{ width: '100%', mt: 2 }}
                                />
                                <TextField
                                    id="outlined-textarea"
                                    label="Description"
                                    placeholder="Enter project description"
                                    multiline
                                    rows={8}
                                    name="description"
                                    value={project.description}
                                    onChange={handleInputChange}
                                    sx={{ width: '100%', mt: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <DataGrid
                                    rows={users}
                                    columns={COLUMNS}
                                    pageSize={2}
                                    rowsPerPageOptions={[2]}
                                    checkboxSelection
                                    selectionModel={selectedMembers}
                                    onSelectionModelChange={(newSelection) => {
                                        setProject({...project, memberIds: newSelection})
                                        setSelectedMembers(newSelection)
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 12, display: 'flex', justifyContent: 'space-between' }}>
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
                                disabled={!canSave}
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

export default AddProject