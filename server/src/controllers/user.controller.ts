import { NextFunction, Request, Response } from 'express'
import User from '~/models/user.model'
import ApiError from '~/utils/ApiError'
import asyncHandler from '~/utils/asyncHandler'

interface ICreateUserRequest extends Request {
  body: {
    auth0Id: string
    email: string
  }
}

export const createUser = asyncHandler(async (req: ICreateUserRequest, res: Response, next: NextFunction) => {
  const { auth0Id, email } = req.body

  const user = await User.findOne({ auth0Id }).exec()

  if (user) {
    return res.status(200).send()
  }

  const newUser = new User({ auth0Id, email })

  await newUser.save()

  res.status(200).json({ user: newUser.toObject() })
})

interface IUpdateCurrentUserRequest extends Request {
  body: {
    name: string
    addressLine1: string
    country: string
    city: string
  }
}

export const updateCurrentUser = asyncHandler(
  async (req: IUpdateCurrentUserRequest, res: Response, next: NextFunction) => {
    const { name, addressLine1, country, city } = req.body

    const user = await User.findById(req.userId).exec()

    if (!user) {
      throw new ApiError(404, 'User not found')
    }

    user.name = name
    user.addressLine1 = addressLine1
    user.country = country
    user.city = city

    await user.save()

    res.status(200).json({ user: user.toObject() })
  }
)
