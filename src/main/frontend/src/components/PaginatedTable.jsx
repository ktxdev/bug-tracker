import { Delete, NoteAlt } from '@mui/icons-material'
import { Avatar, AvatarGroup, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import React from 'react'
import { useAuth } from '../auth/auth'
import TablePaginationActions from './TablePaginationActions'

const PaginatedTable = ({ columns, data, count, page, rowsPerPage, handlePageChange, handleRowsPerPageChange }) => {
    
    const { auth: { profile } } = useAuth();

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                            data.map(dt => {
                                return (
                                    <TableRow key={dt.id}>
                                        {
                                            columns.map(column => {
                                                if (column.id === 'actions') {
                                                    return (<TableCell key={column.id}>
                                                        {
                                                            column.actions.map(action => (<IconButton disabled={profile !== null && profile.role === 'USER'} key={action.id} onClick={() => action.onClick(dt.id)} color={action.color} size="small" sx={{ mx: 1 }} >
                                                                {action.icon}
                                                            </IconButton>))
                                                        }
                                                    </TableCell>)
                                                }

                                                const value = dt[column.id];
                                                if(typeof value === 'object') {
                                                    return (<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                                        {value.length > 0 && <AvatarGroup sx={{ flexDirection: 'row' }}>
                                                            { value.map(member => <Avatar>{`${member.firstName[0]}${member.lastName[0]}`}</Avatar>) }
                                                        </AvatarGroup> }
                                                    </TableCell>)
                                                }
                                                return (<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                                    {value === null ? "---" : value}
                                                </TableCell>)
                                            })
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={columns.length}
                                count={count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page'
                                    },
                                    native: true
                                }}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                ActionsComponent={TablePaginationActions} />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default PaginatedTable