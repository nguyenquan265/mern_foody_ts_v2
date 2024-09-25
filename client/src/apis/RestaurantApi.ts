import { SearchState } from '@/pages/SearchPage'
import { Restaurant, RestaurantSearchResponse } from '@/types'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/api/v1/restaurants`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!res.ok) {
      throw new Error('Failed to get restaurant')
    }

    return res.json()
  }

  const { data: currentRestaurant, isLoading, isError, error } = useQuery('currentRestaurant', getRestaurantRequest)

  if (isError) {
    console.log(error)

    toast.error('Failed to get restaurant')
  }

  return { currentRestaurant, isLoading }
}

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/api/v1/restaurants`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: restaurantFormData
    })

    if (!res.ok) {
      throw new Error('Failed to create restaurant')
    }

    return res.json()
  }

  const { mutate: createRestaurant, isLoading, isError, isSuccess, error } = useMutation(createRestaurantRequest)

  if (isSuccess) {
    toast.success('Restaurant created successfully')
  }

  if (isError) {
    console.log(error)

    toast.error('Failed to create restaurant')
  }

  return {
    createRestaurant,
    isLoading
  }
}

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/api/v1/restaurants`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: restaurantFormData
    })

    if (!res.ok) {
      throw new Error('Failed to update restaurant')
    }

    return res.json()
  }

  const { mutate: updateRestaurant, isLoading, isError, isSuccess, error } = useMutation(updateRestaurantRequest)

  if (isSuccess) {
    toast.success('Restaurant updated successfully')
  }

  if (isError) {
    console.log(error)

    toast.error('Failed to update restaurant')
  }

  return {
    updateRestaurant,
    isLoading
  }
}

export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams()
    params.set('searchQuery', searchState.searchQuery)

    const res = await fetch(`${API_BASE_URL}/api/v1/restaurants/search/${city}?${params.toString()}`)

    if (!res.ok) {
      throw new Error('Failed to search restaurants')
    }

    return res.json()
  }

  const { data: result, isLoading } = useQuery(['searchRestaurants', searchState], createSearchRequest, {
    enabled: !!city // Only fetch data if city is provided
  })

  return { result, isLoading }
}
