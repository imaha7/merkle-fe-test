// ** React Imports
import React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from 'react-query'
import { showUser, addUser, updateUser, deleteUser } from '../../../actions/userAction'

const TabAccount = () => {
  const router = useRouter()
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')

  const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFirstName(event.target.value)
  }

  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLastName(event.target.value)
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value)
  }

  const showUserData = useQuery(['showUser', router.query.id], () => showUser({ id: router.query.id }), {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    onSuccess: (response: any) => {
      setFirstName(response.data.name.firstname)
      setLastName(response.data.name.lastname)
      setEmail(response.data.email)
      console.log(response.data)
    },
    onError: error => {
      console.log(error)
    }
  })

  const deleteUserData = useMutation(() => deleteUser({ id: router.query.id }), {
    onMutate: () => {
      return {
        id: router.query.id
      }
    },
    onSuccess: (response: any) => {
      console.log(response)
      router.replace('/')
    },
    onError: (error: any) => {
      console.log('error', error)
    }
  })

  const addUserData = useMutation(
    () =>
      addUser({
        name: {
          firstname: firstName,
          lastname: lastName
        },
        email: email
      }),
    {
      onMutate: () => {
        return {
          name: {
            firstName: firstName,
            lastName: lastName
          },
          email: email
        }
      },
      onSuccess: (response: any) => {
        console.log(response)
        router.replace('/')
      },
      onError: (error: any) => {
        console.log('error', error)
      }
    }
  )

  const updateUserData = useMutation(
    () =>
      updateUser({
        id: router.query.id,
        name: {
          firstname: firstName,
          lastname: lastName
        },
        email: email
      }),
    {
      onMutate: () => {
        return {
          id: router.query.id,
          name: {
            firstName: firstName,
            lastName: lastName
          },
          email: email
        }
      },
      onSuccess: (response: any) => {
        console.log(response)
        router.replace('/')
      },
      onError: (error: any) => {
        console.log('error', error)
      }
    }
  )

  React.useEffect(() => {
    if(router.query.id){
      showUserData
    }
  }, [])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='First Name'
              placeholder='First Name'
              value={firstName}
              onChange={handleChangeFirstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Last Name'
              placeholder='Last Name'
              value={lastName}
              onChange={handleChangeLastName}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              value={email}
              onChange={handleChangeEmail}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant='contained'
              sx={{ marginRight: 3.5 }}
              onClick={() => {
                router.pathname === '/user-add' ? addUserData.mutate() : updateUserData.mutate()
              }}
            >
              {router.pathname === '/user-add' ? 'Add User' : 'Save Changes'}
            </Button>
            {router.pathname === '/user-add' ? null : (
              <Button
                variant='contained'
                sx={{ marginRight: 3.5 }}
                onClick={() => {
                  deleteUserData.mutate()
                }}
              >
                Delete User
              </Button>
            )}
            <Button
              type='reset'
              variant='outlined'
              color='secondary'
              onClick={() => {
                router.replace('/')
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
