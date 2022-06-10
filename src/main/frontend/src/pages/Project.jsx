import { Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectById } from '../api/projects-api';
import { useAuth } from '../auth/auth';
import { useAlert } from '../utils/AlertContext';


const Project = () => {
    const params = useParams();

    const { auth: { accessToken } } = useAuth();

    const [project, setProject] = useState({})

    const { setFeedback } = useAlert();

    useEffect(() => {
        fetchProduct();
    }, [])

    const fetchProduct = async () => {
        const response = await getProjectById(params.projectId, accessToken);
        if (response.success) {
            setProject(response.data);
        } else {
            setFeedback({
                open: true,
                severity: 'error',
                title: 'Failed to load project details. Please refresh page.'
            })
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    }

    const [selectedUsers, setSelectedUsers] = useState([]);

    const selectedUsersDisplayName = () => {
        const displayName = '';
        for(let i = 0; i < selectedUsers.length; i++) {
            if(i > 0) displayName += ", ";
            displayName += selectedUsers[i].firstName + selectedUsers[i].lastName
        }
        return displayName;
    }

    return (
        <div>
            <Typography color="text.secondary" variant="body" gutterBottom>
                Project Details
            </Typography>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
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
                            multiline
                            rows={8}
                            name="description"
                            value={project.description}
                            onChange={handleInputChange}
                            sx={{ width: '100%', mt: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        Othe part
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default Project