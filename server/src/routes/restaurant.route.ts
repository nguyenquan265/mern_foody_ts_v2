import { Router } from 'express'
import { createRestaurant, getCurrentRestaurant, updateRestaurant } from '~/controllers/restaurant.controller'
import { jwtCheck, jwtParse } from '~/middlewares/auth.middleware'
import uploader from '~/middlewares/upload.middleware'
import { validateRestaurantRequest } from '~/middlewares/validate.middleware'

const router = Router()

router.get('/', jwtCheck, jwtParse, getCurrentRestaurant)
router.post('/', uploader.single('imageFile'), validateRestaurantRequest, jwtCheck, jwtParse, createRestaurant)
router.patch('/', uploader.single('imageFile'), validateRestaurantRequest, jwtCheck, jwtParse, updateRestaurant)

export default router
