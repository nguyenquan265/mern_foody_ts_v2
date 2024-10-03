import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from 'react-query'
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
