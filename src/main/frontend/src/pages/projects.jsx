import { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Box, Button, Card, CardActions, CardContent, Divider, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { width } from "@mui/system";
import ProjectDetails from "../components/projects/ProjectDetails";
import { createProject, getAllProjects } from "../api/projects-api";
import { useAuth } from "../auth/auth";
import { useAlert } from "../utils/AlertContext";


const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'left' },
  { id: 'description', label: 'Description', minWidth: 100, align: 'left' },
  { id: 'members', label: 'Members', minWidth: 170, align: 'left' }
];

const Projects = () => {

  useEffect(() => {
    document.title = 'Projects | Bug Tracker';
  }, []);

  const getName = (name) => {
    const names = name.split(' ');
    return names[0][0] + names[1][0];
  }

  const [modalOpen, setModalOpen] = useState(false)

  const initProjectState = { name: '', description: '' }
  const [project, setProject] = useState(initProjectState)

  const toggleModal = () => setModalOpen(!modalOpen)

  const { auth: { accessToken } } = useAuth();

  const { setFeedback } = useAlert();

  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = async () => {
      const response = await getAllProjects(accessToken);
      if (response.success) {
        setProjects(response.data.content);
      } else {
        setFeedback({
          open: true,
          severity: 'error',
          title: 'Failed to load projects. Please refresh page.'
        })
      }
    }

    getProjects();
  }, [])

  const saveProject = async () => {
    const response = await createProject(project, accessToken);
    const data = response.data;
    if (response.success) {
      console.log(data);
      setFeedback({
        open: true,
        severity: 'success',
        title: 'Project successfully created!'
      })

      setProject(initProjectState)
      toggleModal();
    } else {
      setFeedback({
        open: true,
        severity: 'error',
        title: data.message
      })
    }
  }

  return (
    <div>
      <Typography
        color='textSecondary'
        variant='h5'
      >
        Projects
      </Typography>

      <Divider sx={{
        my: 1
      }} />

      <Box sx={{ py: 1, display: 'flex', justifyContent: 'flex-end' }} >
        <Button
          color='primary'
          size='small'
          variant='contained'
          sx={{ mb: 1, textTransform: 'none' }}
          onClick={toggleModal}
        >
          New Project
        </Button>
      </Box>

      <ProjectDetails
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        project={project}
        setProject={setProject}
        onSave={saveProject} />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead >
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                projects.map(project => {
                  return (
                    <TableRow key={project.id}>
                      {
                        columns.map(column => {
                          const value = project[column.id];
                          return (<TableCell key={column.id} align={column.align}
                            style={{ minWidth: column.minWidth }}>
                            {
                              typeof value === 'object' ?
                                <AvatarGroup max={4} sx={{ width: 'max-content' }} >
                                  {value.map(v => <Avatar>{getName(v.name)}</Avatar>)}
                                </AvatarGroup> : value
                            }
                          </TableCell>)
                        })
                      }
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default Projects