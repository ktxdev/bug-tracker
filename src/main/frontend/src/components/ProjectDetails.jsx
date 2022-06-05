import { Box, Button, Card, CardContent, Divider, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ProjectDetails = ({modalOpen, toggleModal, project, setProject, onSave}) => {

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
                        Project Details
                    </Typography>
                    <Divider sx={{
                        my: 1
                    }} />
                    <form onSubmit={handleFormSubmit} >
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
                            rows={4}
                            name="description"
                            value={project.description}
                            onChange={handleInputChange}
                            sx={{ width: '100%', mt: 2 }}
                        />
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

export default ProjectDetails