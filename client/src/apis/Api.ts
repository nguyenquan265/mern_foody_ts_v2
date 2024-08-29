import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getUserRequest = async () => {
    const accessToken = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error('Failed to get user')
    }

    return res.json()
  }

  const { data: user, isLoading, isError, error } = useQuery('currentUser', getUserRequest)

  if (isError) {
    console.log(error)

    toast.error('Failed to get user')
  }

  return { user, isLoading }
}

type CreateUserRequest = {
  auth0Id: string
  email: string
}

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (!res.ok) {
      throw new Error('Failed to create user')
    }
  }

  const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createUserRequest)

  return { createUser, isLoading, isError, isSuccess }
}

type UpdateUserRequest = {
  name: string
  addressLine1: string
  city: string
  country: string
}

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!res.ok) {
      throw new Error('Failed to update user')
    }

    return res.json()
  }

  const { mutateAsync: updateUser, isLoading, isError, isSuccess, error, reset } = useMutation(updateUserRequest)

  if (isSuccess) {
    toast.success('User updated successfully')
  }

  if (isError) {
    console.log(error)

    toast.error('Failed to update user')
    reset()
  }

  return { updateUser, isLoading }
}
