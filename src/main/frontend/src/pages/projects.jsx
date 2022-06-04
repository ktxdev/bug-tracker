import { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Box, Button, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ProjectDetails from "../components/projects/ProjectDetails";
import { createProject, deleteProject, getAllProjects, updateProject } from "../api/projects-api";
import { useAuth } from "../auth/auth";
import { useAlert } from "../utils/AlertContext";
import { Delete, NoteAlt, Visibility } from "@mui/icons-material";
import { useSpinner } from "../utils/SpinnerContext";
import NoContent from "../components/no-content";


const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'left' },
  { id: 'description', label: 'Description', minWidth: 100, align: 'left' },
  { id: 'members', label: 'Members', minWidth: 170, align: 'left' },
  { id: 'actions', label: '', minWidth: 170, align: 'left' },
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


  const { loading, showLoader, hideLoader } = useSpinner();

  useEffect(() => {
    const getProjects = async () => {
      showLoader();

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

      hideLoader();
    }
    getProjects();
  }, [])

  const [isEdit, setIsEdit] = useState(false)

  const saveProject = async () => {
    if (isEdit) {
      editProject((res) => {
        if (res.success) {
          setFeedback({
            open: true,
            severity: 'success',
            title: 'Project successfully updated!'
          })

          const updatedProjects = projects.map(p => {
            if (p.id !== project.id) return p;
            return res.data;
          })

          setIsEdit(false)
          setProjects(updatedProjects)
          setProject(initProjectState)
          toggleModal();
        } else {
          setFeedback({
            open: true,
            severity: 'error',
            title: res.data.message
          })
        }
      });
    } else {
      addProject((res) => {
        if (res.success) {
          setFeedback({
            open: true,
            severity: 'success',
            title: 'Project successfully created!'
          })

          setProjects([...projects, res.data])
          setProject(initProjectState)
          toggleModal();
        } else {
          setFeedback({
            open: true,
            severity: 'error',
            title: res.data.message
          })
        }
      });
    }
  }

  const handleEditButtonClick = (id) => {
    setIsEdit(true);
    const projectToEdit = projects.filter(project => project.id === id)[0];
    setProject(projectToEdit);
    toggleModal();
  }

  const editProject = async (callback) => {
    const response = await updateProject(project.id, project, accessToken);
    callback(response);
  }

  const addProject = async (callback) => {
    const response = await createProject(project, accessToken);
    callback(response)
  }

  const removeProject = async (id) => {
    const response = await deleteProject(id, accessToken);
    const data = response.data;

    if (response.success) {
      setFeedback({
        open: true,
        severity: 'success',
        title: 'Project successfully deleted!'
      })

      const newProjects = projects.filter(project => project.id !== id);
      setProjects(newProjects);
    } else {
      setFeedback({
        open: true,
        severity: 'error',
        title: data.message
      })
    }
  }

  return (
    <>
      {!loading && <Box sx={{ mx: 4, my: 2 }}>
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

        {
          projects.length === 0 ? <NoContent message="There are no projects. You can add one by clicking the 'New Project' button." />
            : <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer>
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
                                if (column.id === 'actions') {
                                  return (<TableCell
                                    key={column.id}>
                                    <IconButton color="success" size="small" >
                                      <Visibility />
                                    </IconButton>
                                    <IconButton onClick={() => handleEditButtonClick(project.id)} color="primary" size="small" sx={{ mx: 1 }} >
                                      <NoteAlt />
                                    </IconButton>
                                    <IconButton onClick={() => removeProject(project.id)} color="error" size="small" >
                                      <Delete />
                                    </IconButton>
                                  </TableCell>)
                                }

                                const value = project[column.id];
                                return (<TableCell key={column.id} align={column.align}
                                  style={{ minWidth: column.minWidth }}>
                                  {
                                    value !== null && typeof value === 'object' ?
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
        }
      </Box>}
    </>
  )
}

export default Projects