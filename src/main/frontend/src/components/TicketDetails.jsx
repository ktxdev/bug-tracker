import { Button, Card, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { getAllProjects } from '../api/projects-api'
import { useAuth } from '../auth/auth'

const TicketDetails = ({ ticketModalOpen, toggleTicketModal, ticket, setTicket, onSave }) => {

    const [canSave, setCanSave] = useState(false)

    useEffect(() => {
        fetchAllProjects();
        setSelectedAssignees((ticket && ticket.assignees) ? ticket.assignees.map(assignee => assignee.id) : []);
    }, [])

    const [projects, setProjects] = useState([])
    const { auth: { accessToken } } = useAuth();
    const fetchAllProjects = async () => {
        const response = await getAllProjects(accessToken);
        if (response.success) {
            setProjects(response.data)
        }
    }

    const [users, setUsers] = useState([])

    const [selectedAssignees, setSelectedAssignees] = useState([])

    useEffect(() => {
        setUsers((ticket && ticket.project) ? ticket.project.members.map(member => ({ id: member.id, name: `${member.firstName} ${member.lastName}`})): [])
    }, [ticket])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'timeEstimated' || name === 'timeEstimatedUnit') {
            setTicket({ ...ticket, timeEstimated: { ...ticket.timeEstimated, [name]: value } })
        } else {
            setTicket({ ...ticket, [name]: value })
        }

        if (name === 'projectId') {
            const project = projects.filter(project => project.id === value)[0];
            const assignees = project.members.map(member => ({
                id: member.id,
                name: `${member.firstName} ${member.lastName}`
            }));
            setUsers(assignees);
            setSelectedAssignees([]);
        }
    }

    useEffect(() => {
        if (ticket.title !== '' && ticket.projectId !== 0) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [ticket])

    const COLUMNS = [
        { field: 'name', headerName: 'Name', width: 350 },
    ]

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setUsers([]);
        onSave();
    }

    return (
        <Modal
            open={ticketModalOpen}
            onClose={toggleTicketModal}
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
                        Ticket Details
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6} >
                                <FormControl fullWidth sx={{ my: 2 }}>
                                    <InputLabel id="project-label">Project</InputLabel>
                                    <Select
                                        labelId='project-label'
                                        id='Project'
                                        label='Project'
                                        name='projectId'
                                        value={ticket.projectId}
                                        onChange={handleInputChange}
                                    >
                                        {
                                            projects.map(project => <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>

                                <TextField
                                    required
                                    id="title"
                                    label="Title"
                                    name="title"
                                    value={ticket.title}
                                    onChange={handleInputChange}
                                    sx={{ width: '100%', mt: 2 }}
                                />
                                <TextField
                                    id="description"
                                    label="Description"
                                    placeholder="Enter ticket description"
                                    name="description"
                                    value={ticket.description}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    sx={{ width: '100%', mt: 2 }}
                                />
                                <TextField
                                    id="timeEstimated"
                                    label="Estimated Time"
                                    name="timeEstimated"
                                    type='number'
                                    value={ticket.timeEstimated.timeEstimated}
                                    onChange={handleInputChange}
                                    sx={{ width: '100%', mt: 2 }}
                                    inputProps={{ min: 0 }}
                                />

                                <FormControl fullWidth sx={{ my: 2 }}>
                                    <InputLabel id="time-unit-label">Estimated Time Unit</InputLabel>
                                    <Select
                                        labelId='time-unit-label'
                                        id='time-unit'
                                        label='Estimated Time Unit'
                                        name='timeEstimatedUnit'
                                        value={ticket.timeEstimated.timeEstimatedUnit}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value='MINUTES'>Minutes</MenuItem>
                                        <MenuItem value='HOURS'>Hours</MenuItem>
                                        <MenuItem value='DAYS'>Days</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{ my: 2 }}>
                                    <InputLabel id="priority-label">Priority</InputLabel>
                                    <Select
                                        labelId='priority-label'
                                        id='priority'
                                        label='Priority'
                                        name='priority'
                                        value={ticket.priority}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value='LOW'>Low</MenuItem>
                                        <MenuItem value='MEDIUM'>Medium</MenuItem>
                                        <MenuItem value='HIGH'>High</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{ my: 2 }}>
                                    <InputLabel id="type-label">Type</InputLabel>
                                    <Select
                                        labelId='type-label'
                                        id='type'
                                        label='Type'
                                        name='type'
                                        value={ticket.type}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value='BUG'>Bug</MenuItem>
                                        <MenuItem value='FEATURE'>Feature</MenuItem>
                                        <MenuItem value='ISSUE'>Issue</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{ my: 2 }}>
                                    <InputLabel id="status-label">Status</InputLabel>
                                    <Select
                                        labelId='status-label'
                                        id='status'
                                        label='Status'
                                        name='status'
                                        value={ticket.status}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value='OPEN'>Open</MenuItem>
                                        <MenuItem value='IN_PROGRESS'>In Progress</MenuItem>
                                        <MenuItem value='RESOLVED'>Resolved</MenuItem>
                                        <MenuItem value='CLOSED'>Closed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Typography sx={{ my: 1 }} >Ticket Assignees</Typography>
                                <DataGrid
                                    rows={users}
                                    columns={COLUMNS}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    selectionModel={selectedAssignees}
                                    onSelectionModelChange={(newSelection) => {
                                        setTicket({ ...ticket, assigneeIds: newSelection })
                                        setSelectedAssignees(newSelection)
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 12, display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                onClick={toggleTicketModal}
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

export default TicketDetails