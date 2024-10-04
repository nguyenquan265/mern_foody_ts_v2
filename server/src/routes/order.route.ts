import { Router } from 'express'
import {
  createCheckoutSession,
  getOrders,
  stripeWebhookHandler,
  updateOrderStatus
} from '~/controllers/order.controller'
import { jwtCheck, jwtParse } from '~/middlewares/auth.middleware'

const router = Router()

router.get('/', jwtCheck, jwtParse, getOrders)
router.post('/checkout/create-checkout-session', jwtCheck, jwtParse, createCheckoutSession)
router.post('/checkout/webhook', stripeWebhookHandler)
router.patch('/:orderId/status', jwtCheck, jwtParse, updateOrderStatus)

export default router
