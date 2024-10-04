import { Order } from '@/types'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string
    name: string
    quantity: string
  }[]
  deliveryDetails: {
    email: string
    name: string
    addressLine1: string
    city: string
  }
  restaurantId: string
}

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
    const accessToken = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/api/v1/orders/checkout/create-checkout-session`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutSessionRequest)
    })

    if (!res.ok) {
      throw new Error('Failed to create checkout session')
    }

    return res.json()
  }

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    isError,
    error,
    reset
  } = useMutation(createCheckoutSessionRequest)

  if (isError) {
    console.log(error)

    toast.error('Failed to create checkout session')
    reset()
  }

  return { createCheckoutSession, isLoading }
}

export const useGetOrders = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/api/v1/orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!res.ok) {
      throw new Error('Failed to fetch orders')
    }

    return res.json()
  }

  const { data: orders, isLoading } = useQuery('fetchMyOrders', getMyOrdersRequest, { refetchInterval: 5000 })

  return { orders, isLoading }
}

type UpdateOrderStatusRequest = {
  orderId: string
  status: string
}

export const useUpdateOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateMyRestaurantOrder = async (updateOrderStatusRequest: UpdateOrderStatusRequest) => {
    const accessToken = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/api/v1/orders/${updateOrderStatusRequest.orderId}/status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: updateOrderStatusRequest.status })
    })

    if (!res.ok) {
      throw new Error('Failed to update order status')
    }

    return res.json()
  }

  const {
    mutateAsync: updateOrderStatus,
    isLoading,
    isError,
    error,
    reset,
    isSuccess
  } = useMutation(updateMyRestaurantOrder)

  if (isSuccess) {
    toast.success('Order status updated successfully')
  }

  if (isError) {
    console.log(error)

    toast.error('Failed to update order status')
    reset()
  }

  return { updateOrderStatus, isLoading }
}
