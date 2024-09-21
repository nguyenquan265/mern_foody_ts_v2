import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import cloudinary from '~/config/cloudinary'
import Restaurant from '~/models/restaurant.model'
import ApiError from '~/utils/ApiError'
import asyncHandler from '~/utils/asyncHandler'

// Path: .../restaurants

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

  const imageUrl = await uploadRestaurantImage(req.file)

  const restaurant = new Restaurant(req.body)
  restaurant.imageUrl = imageUrl
  restaurant.user = new Types.ObjectId(req.userId)

  await restaurant.save()

  res.status(200).json({ restaurant: restaurant.toObject() })
})

interface IUpdateUserRequest extends Request {
  body: {
    restaurantName: string
    city: string
    country: string
    deliveryPrice: number
    estimatedDeliveryTime: number
    cuisines: string[]
    menuItems: { name: string; price: number }[]
  }
  file?: Express.Multer.File
}

export const updateRestaurant = asyncHandler(async (req: IUpdateUserRequest, res: Response, next: NextFunction) => {
  const restaurant = await Restaurant.findOne({ user: req.userId }).exec()

  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found')
  }

  restaurant.restaurantName = req.body.restaurantName
  restaurant.city = req.body.city
  restaurant.country = req.body.country
  restaurant.deliveryPrice = req.body.deliveryPrice
  restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime
  restaurant.cuisines = req.body.cuisines
  restaurant.menuItems = req.body.menuItems

  if (req.file) {
    const imageUrl = await uploadRestaurantImage(req.file)

    restaurant.imageUrl = imageUrl
  }

  await restaurant.save()

  res.status(200).json(restaurant.toObject())
})

export const uploadRestaurantImage = async (imageFile: Express.Multer.File) => {
  const base64Image = imageFile.buffer.toString('base64')
  const dataURI = `data:${imageFile.mimetype};base64,${base64Image}`

  const result = await cloudinary.uploader.upload(dataURI, { folder: 'file-upload' })

  return result.secure_url
}

// Path: .../restaurants/search/:city

export const searchRestaurants = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const city = req.params.city
  const searchQuery = (req.query.searchQuery as string) || ''
  const selectedCuisines = (req.query.selectedCuisines as string) || ''
  const sortOption = (req.query.sortOption as string) || 'updatedAt'
  const page = parseInt(req.query.page as string) || 1
  const limit = 10
  const skip = (page - 1) * limit

  let query: any = {}

  query['city'] = new RegExp(city, 'i') // new RegExp co nghia la regular expression, 'i' co nghia la khong phan biet chu hoa chu thuong

  const countRestaurants = await Restaurant.countDocuments(query)

  if (countRestaurants === 0) {
    return res.status(404).json({ data: [], pagination: { total: 0, page: 1, pages: 1 } })
  }

  if (searchQuery) {
    const searchRegex = new RegExp(searchQuery, 'i')

    query['$or'] = [{ restaurantName: searchRegex }, { cuisines: { $in: [searchRegex] } }]
  }

  if (selectedCuisines) {
    const cuisinesArray = selectedCuisines.split(',').map((cuisine) => new RegExp(cuisine, 'i'))

    query['cuisines'] = { $all: cuisinesArray } // $all co nghia la phai co tat ca cac phan tu trong mang
  }

  const [restaurants, total] = await Promise.all([
    Restaurant.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ [sortOption]: -1 }) // sortOption vao [] de co the truyen bien vao
      .lean(),
    Restaurant.countDocuments(query)
  ])

  res.status(200).json({ data: restaurants, pagination: { total, page, pages: Math.ceil(total / limit) } })
})
