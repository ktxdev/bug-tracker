import { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Box, Button, Card, CardActions, CardContent, Divider, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { width } from "@mui/system";
import ProjectDetails from "../components/projects/ProjectDetails";


const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'left' },
  { id: 'description', label: 'Description', minWidth: 100, align: 'left' },
  { id: 'members', label: 'Members', minWidth: 170, align: 'left' }
];

function createData(name, description, members) {
  return { name, description, members };
}

const rows = [
  createData('Bug Tracker', 'Bug Tracker description', [{ name: 'Sean Huvaya' }, { name: 'Tinashe Chisenga' }]),
  createData('Expense Tracker', 'Expense Tracker description', [{ name: 'Sean Huvaya' }]),
  createData('Chat Application', 'Chat Application description', [{ name: 'Tinashe Chisenga' }]),
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

  const initProjectState = { name: '', description: ''}
  const [project, setProject] = useState(initProjectState)

  const toggleModal = () => setModalOpen(!modalOpen)

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

      <ProjectDetails modalOpen={modalOpen} toggleModal={toggleModal} project={project} setProject={setProject} />

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
                rows.map(row => {
                  return (
                    <TableRow key={row.name}>
                      {
                        columns.map(column => {
                          const value = row[column.id];
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