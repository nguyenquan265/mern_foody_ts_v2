import { NextFunction, Request, Response } from 'express'
import Stripe from 'stripe'
import env from '~/config/env'
import { MenuItemType } from '~/models/menuItem.model'
import Order from '~/models/order.model'
import Restaurant from '~/models/restaurant.model'
import ApiError from '~/utils/ApiError'
import asyncHandler from '~/utils/asyncHandler'

const STRIPE = new Stripe(env.stripeApiKey)
const FRONTEND_URL = env.frontendUrl

interface CheckoutSessionRequest extends Request {
  body: {
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
}

export const createCheckoutSession = asyncHandler(
  async (req: CheckoutSessionRequest, res: Response, next: NextFunction) => {
    const checkoutSessionRequest = req.body
    const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId)

    if (!restaurant) {
      throw new ApiError(404, 'Restaurant not found')
    }

    const order = new Order({
      restaurant: restaurant._id,
      user: req.userId,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      status: 'placed'
    })

    const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems as MenuItemType[])

    const session = await createSession(
      lineItems,
      order._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString()
    )

    if (!session.url) {
      throw new ApiError(500, 'Failed to create checkout session')
    }

    await order.save()

    res.status(200).json({ url: session.url })
  }
)

const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest['body'], menuItems: MenuItemType[]) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString())

    if (!menuItem) {
      throw new ApiError(404, `Menu item not found: ${cartItem.menuItemId}`)
    }

    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: 'usd',
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name
        }
      },
      quantity: parseInt(cartItem.quantity)
    }

    return line_item
  })

  return lineItems
}

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery',
          type: 'fixed_amount',
          fixed_amount: {
            amount: deliveryPrice,
            currency: 'usd'
          }
        }
      }
    ],
    mode: 'payment',
    metadata: {
      orderId,
      restaurantId
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?canceled=true`
  })

  return sessionData
}

export const stripeWebhookHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log('RECEIVED EVENT')
  console.log('==============')
  console.log('event: ', req.body)

  res.send()
})
