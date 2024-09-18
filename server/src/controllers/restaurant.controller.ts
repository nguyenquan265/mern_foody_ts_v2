import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import cloudinary from '~/config/cloudinary'
import Restaurant from '~/models/restaurant.model'
import ApiError from '~/utils/ApiError'
import asyncHandler from '~/utils/asyncHandler'

export const getCurrentRestaurant = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const restaurant = await Restaurant.findOne({ user: req.userId }).exec()

  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found')
  }

  res.status(200).json(restaurant.toObject())
})

interface ICreateUserRequest extends Request {
  body: {
    restaurantName: string
    city: string
    country: string
    deliveryPrice: number
    estimatedDeliveryTime: number
    cuisines: string[]
    menuItems: { name: string; price: number }[]
  }
  file: Express.Multer.File
}

export const createRestaurant = asyncHandler(async (req: ICreateUserRequest, res: Response, next: NextFunction) => {
  const existingRestaurant = await Restaurant.findOne({ user: req.userId }).exec()

  if (existingRestaurant) {
    throw new ApiError(409, 'Restaurant already exists for this user')
  }

  const image = req.file
  const base64Image = image.buffer.toString('base64')
  const dataURI = `data:${image.mimetype};base64,${base64Image}`

  const result = await cloudinary.uploader.upload(dataURI, { folder: 'file-upload' })

  const restaurant = new Restaurant(req.body)
  restaurant.imageUrl = result.secure_url
  restaurant.user = new Types.ObjectId(req.userId)
  await restaurant.save()

  res.status(200).json({ restaurant: restaurant.toObject() })
})
