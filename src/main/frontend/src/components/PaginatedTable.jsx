import { Delete, NoteAlt } from '@mui/icons-material'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import React from 'react'
import TablePaginationActions from './TablePaginationActions'

const PaginatedTable = ({ columns, data, count, page, rowsPerPage, onEditAction, onDeleteAction, handlePageChange, handleRowsPerPageChange }) => {
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
                                                        <IconButton onClick={() => onEditAction(dt.id)} color="primary" size="small" sx={{ mx: 1 }} >
                                                            <NoteAlt />
                                                        </IconButton>
                                                        <IconButton onClick={() => onDeleteAction(dt.id)} color="error" size="small" >
                                                            <Delete />
                                                        </IconButton>
                                                    </TableCell>)
                                                }

                                                const value = dt[column.id];
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