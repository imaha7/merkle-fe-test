// ** React Imports
import React, { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import { useQuery } from 'react-query'
import { getUsers } from '../../../actions/userAction'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

interface Column {
  id: 'name' | 'email' | 'action'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170 }
]

interface Data {
  id: string,
  name: string
  email: string
}

function createData(id: string, name: string, email: string): Data {
  return { id, name, email }
}

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767)
// ]

const TableStickyHeader = () => {
  // ** States
  const router = useRouter()
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [rows, setRows] = React.useState([])

  const getUsersData = useQuery(['getUsers'], () => getUsers(), {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    onSuccess: (response: any) => {
      if (response) {
        let arr = []
        response.data.map((item: any) => {
          arr.push(createData(item.id, item.name.firstname + ' ' + item.name.lastname, item.email))
        })
        setRows(arr)
        console.log('Data : ' + response)
      } else {
        setRows([])
      }
    },
    onError: error => {
      console.log(error)
    }
  })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  React.useEffect(() => {
    getUsersData
  }, [page, rowsPerPage])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id !== 'action' ? (
                          value
                        ) : (
                          <Button
                            fullWidth
                            size='large'
                            variant='contained'
                            sx={{ marginBottom: 7, marginTop: 7 }}
                            onClick={() => {
                              router.push({
                                pathname: '/user-detail',
                                query: { id: row.id }
                              })
                            }}
                          >
                            Detail
                          </Button>
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableStickyHeader
