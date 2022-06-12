import { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Box, Button, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddProject from "../components/AddProject";
import { createProject, deleteProject, getAllProjectsPaged, updateProject } from "../api/projects-api";
import { useAuth } from "../auth/auth";
import { useAlert } from "../utils/AlertContext";
import { Delete, NoteAlt, Visibility } from "@mui/icons-material";
import { useSpinner } from "../utils/SpinnerContext";
import NoContent from "../components/NoContent";
import PaginatedTable from "../components/PaginatedTable";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const Projects = () => {

  useEffect(() => {
    document.title = 'Projects | Bug Tracker';
  }, []);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [modalOpen, setModalOpen] = useState(false)

  const initProjectState = { name: '', description: '' }
  const [project, setProject] = useState(initProjectState)

  const toggleModal = () => setModalOpen(!modalOpen)

  const { auth: { profile, accessToken } } = useAuth();

  const { setFeedback } = useAlert();

  const [projects, setProjects] = useState([])


  const { loading, showLoader, hideLoader } = useSpinner();

  useEffect(() => {
    const fetch = async () => {
      showLoader();
      await fetchProjects(page, rowsPerPage);
      hideLoader();
    }

    fetch();
  }, [])

  const fetchProjects = async (page, size) => {
    const response = await getAllProjectsPaged(page, size, accessToken);

    if (response.success) {
      const data = response.data;
      setTotalCount(data.totalElements)
      setPage(data.number)
      setRowsPerPage(data.size)
      setProjects(data.content);
    } else {
      setFeedback({
        open: true,
        severity: 'error',
        title: 'Failed to load projects. Please refresh page.'
      })
    }
  }

  const [isEdit, setIsEdit] = useState(false)

  const saveProject = async () => {
    console.log(project);
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

    fetchProjects(page, rowsPerPage);
  }

  const editProject = async (callback) => {
    const response = await updateProject(project.id, project, accessToken);
    callback(response);
  }

  const addProject = async (callback) => {
    const response = await createProject(project, accessToken);
    callback(response)
  }

  const onEdit = (id) => {
    setIsEdit(true);
    const projectToEdit = projects.filter(project => project.id === id)[0];
    setProject(projectToEdit);
    toggleModal();
  }


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchProjects(newPage, rowsPerPage);
  }

  const handleRowsPerPageChange = (event) => {
    const size = event.target.value;
    setRowsPerPage(size);
    setPage(0);
    fetchProjects(0, size);
  }

  const onDelete = async (id) => {
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
      setFeedback({ open: true, severity: 'error', title: data.message })
    }
  }

  const COLUMNS = [
    { id: 'name', label: 'Name', minWidth: 170, align: 'left' },
    { id: 'description', label: 'Description', minWidth: 100, align: 'left' },
    { id: 'members', label: 'Members', minWidth: 170, align: 'left' },
    {
      id: 'actions', label: '', minWidth: 170, align: 'left', actions: [
        { id: 'show-details', icon: <NoteAlt />, color: 'primary', onClick: onEdit },
        { id: 'delete-project', icon: <Delete />, color: 'error', onClick: onDelete }
      ]
    },
  ];

  return (
    <>
      {!loading && <Box sx={{ mx: 4, my: 2 }}>
        <Typography
          color='textSecondary'
          variant='h5'
        >
          Projects
        </Typography>

        <Divider sx={{ my: 1 }} />

        {(profile != null && profile.role !== 'USER') && <Box sx={{ py: 1, display: 'flex', justifyContent: 'flex-end' }} >
          <Button
            color='primary'
            size='small'
            variant='contained'
            sx={{ mb: 1, textTransform: 'none' }}
            onClick={toggleModal}
          >
            New Project
          </Button>
        </Box>}

        <AddProject
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          project={project}
          setProject={setProject}
          onSave={saveProject} />

        {projects.length === 0 ? <NoContent message="There are no projects. You can add one by clicking the 'New Project' button." />
          : <PaginatedTable columns={COLUMNS} data={projects} count={totalCount}
            page={page} rowsPerPage={rowsPerPage}
            handlePageChange={handlePageChange} handleRowsPerPageChange={handleRowsPerPageChange} />
        }
      </Box>}
    </>
  )
}

export default Projects