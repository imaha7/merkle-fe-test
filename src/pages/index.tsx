import { Button, Card, CardHeader } from '@mui/material'
import { useRouter } from 'next/router'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Dashboard = () => {
  const router = useRouter()

  return (
    <>
      <Card>
        <CardHeader title='List All User' titleTypographyProps={{ variant: 'h6' }} />
        <Button
          variant='contained'
          sx={{mt: 2, mb: 5, mx: 5}}
          onClick={() => {
            router.replace('/user-add')
          }}
        >
          Add User
        </Button>
        <TableStickyHeader />
      </Card>
    </>
  )
}

export default Dashboard
