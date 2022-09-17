import axios from '../utils/axios'

export const getUsers = async () => {
  const response = await axios.get('/users')
  try {
    return response
  } catch (error) {
    return error
  }
}

export const showUser = async (id: any) => {
  const response = await axios.get('/users/' + id)
  try {
    return response
  } catch (error) {
    return error
  }
}

export const addUser = async (name: string, email: string) => {
  const response = await axios.post('/users', {name: name, email: email})
  try {
    return response
  } catch (error) {
    return error
  }
}

export const updateUser = async (id: any, name: string, email: string) => {
  const response = await axios.patch('/users/' + id, {name: name, email: email})
  try {
    return response
  } catch (error) {
    return error
  }
}

export const deleteUser = async (id: any) => {
  const response = await axios.delete('/users/' + id)
  try {
    return response
  } catch (error) {
    return error
  }
}
