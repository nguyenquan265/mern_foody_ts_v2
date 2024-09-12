import { Router } from 'express'
import userRouter from './user.route'
import restaurantRouter from './restaurant.route'

const router = Router()

router.use('/users', userRouter)
router.use('/restaurants', restaurantRouter)

export default router
