import { Router } from 'express'
import { createCheckoutSession, stripeWebhookHandler } from '~/controllers/order.controller'
import { jwtCheck, jwtParse } from '~/middlewares/auth.middleware'

const router = Router()

router.post('/checkout/create-checkout-session', jwtCheck, jwtParse, createCheckoutSession)
router.post('/checkout/webhook', stripeWebhookHandler)

export default router
