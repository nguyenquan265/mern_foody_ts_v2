import { Router } from 'express'
import userRouter from './user.route'
import restaurantRouter from './restaurant.route'
import orderRouter from './order.route'

const router = Router()

router.use('/users', userRouter)
router.use('/restaurants', restaurantRouter)
router.use('/orders', orderRouter)

export default router
