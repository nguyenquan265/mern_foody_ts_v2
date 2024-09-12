import { Router } from 'express'
import { createRestaurant } from '~/controllers/restaurant.controller'
import { jwtCheck, jwtParse } from '~/middlewares/auth.middleware'
import uploader from '~/middlewares/upload.middleware'
import { validateRestaurantRequest } from '~/middlewares/validate.middleware'

const router = Router()

router.post('/', uploader.single('imageFile'), validateRestaurantRequest, jwtCheck, jwtParse, createRestaurant)

export default router
