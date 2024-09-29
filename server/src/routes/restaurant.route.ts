import { Router } from 'express'
import {
  createRestaurant,
  getCurrentRestaurant,
  getRestaurantById,
  searchRestaurants,
  updateRestaurant
} from '~/controllers/restaurant.controller'
import { jwtCheck, jwtParse } from '~/middlewares/auth.middleware'
import uploader from '~/middlewares/upload.middleware'
import {
  validateRestaurantIdRequest,
  validateRestaurantRequest,
  validateSearchRestaurantRequest
} from '~/middlewares/validate.middleware'

const router = Router()

router.get('/', jwtCheck, jwtParse, getCurrentRestaurant)
router.post('/', uploader.single('imageFile'), validateRestaurantRequest, jwtCheck, jwtParse, createRestaurant)
router.patch('/', uploader.single('imageFile'), validateRestaurantRequest, jwtCheck, jwtParse, updateRestaurant)
router.get('/:restaurantId', validateRestaurantIdRequest, getRestaurantById)

router.get('/search/:city', validateSearchRestaurantRequest, searchRestaurants)

export default router
